import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs";
import {IItem} from "../../../shared/interfaces/IItem";
import {TimerService} from "../../timer.service";
import {IDeactivate} from "../../../shared/interfaces/IDeactivate";
import {IUser} from "../../../shared/interfaces/IUser";
import {TimerMode} from "../../../shared/interfaces/TimerMode";

@Component({
    selector: 'pomodoro',
    templateUrl: './pomodoro.component.html',
    styleUrls: ['./pomodoro.component.scss']
})

export class PomodoroComponent implements OnInit, IDeactivate {

    sub: Subscription;
    item!: IItem;

    user:IUser = this.service.getUserSettings();
    private _focusTime =  this.user.timerSetting.focusTimer;

    editMode: boolean = false;
    mouseActive: boolean = false;
    currentMode: TimerMode = TimerMode.focus;
    pomodoroMaxSection: number = 4;
    pomodoroCurrentSection: number = 0;
    autoPlay: boolean = this.user.autoPlay;
    autoPause: boolean = this.user.autoPause;

    interval: any;
    isActive: boolean = false;
    started: boolean = false;

    percentage: number = 100;

    minutes!: string;
    extraSeconds!: string;

    initialTimer!: number;
    sec!: number;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private service: TimerService
    ) {
        this.sub = this.route.data.subscribe(
            ({tasks}) => {
                this.item = tasks;
            }
        );
        this.initialTimer = this._focusTime;
        this.sec = this.initialTimer * 60;

        this.updateTimer()
    }

    ngOnInit(): void {
    }

    checkNextTimerMode() {
        if (this.currentMode === 'focus') {
            if (this.pomodoroCurrentSection === this.pomodoroMaxSection) {
                this.switchTimerMode("longPause")
                this.pomodoroCurrentSection = 0;
            } else {
                this.switchTimerMode("shortPause")
                this.pomodoroCurrentSection ++;
            }

            if (this.autoPause) {
                this.startTimer()
            }

        } else {
            this.switchTimerMode("focus")
            this.pomodoroCurrentSection ++;

            if (this.autoPlay) {
                this.startTimer()
            }
        }

    }

    switchTimerMode(value: string) {
        if (!this.isActive) {

            // makes sure that when switch Modes, resets the timer
            // apply the visual indicator
            this.applyActive(value);

            switch (value) {
                case 'focus':
                    this.currentMode = TimerMode.focus;
                    break;
                case 'shortPause':
                    this.currentMode = TimerMode.shortPause;
                    break;
                case 'longPause':
                    this.currentMode = TimerMode.longPause;
                    break;
                default:
                    throw new Error("Invalid input inserted")
            }

            this.updateTimerMode(value)
        }
    }

    updateTimerMode(value: string) {

        let newTimer;
        switch (value) {
            case 'focus':
                newTimer =  this.user.timerSetting.focusTimer;
                break;
            case 'shortPause':
                newTimer =  this.user.timerSetting.shortPause;
                break;
            case 'longPause':
                newTimer =  this.user.timerSetting.longPause;
                break;
        }
        if (newTimer) {
            this.minutes = newTimer.toString()
            this.initialTimer = newTimer
        }
        this.resetTimerMode();
    }

    applyActive(itemMode: string) {
        return {
            'active': itemMode === this.currentMode,
            'notActive': itemMode !== this.currentMode
        }
    }

    loseFocus() {
        if (!this.mouseActive){
            console.log("yay");
            this.editMode = false;
        }
    }

    saveTitle(_title: string) {
        this.item.content = _title;
        this.updateItem();
        this.editMode = false;
    }

    canDeactivate(): boolean {
        const redirectBack = (): boolean => {
            this.isActive = true;
            this.router.navigate([`/timer/${this.item.id}`]).then(r => r);
            return false;
        };


        if (this.isActive) {
            if (confirm("O seu pomodoro esta rolando, sair da página irá pausa-lo<br>Tem certeza que deseja sair?")) {
                this.pauseTimer();
                this.resetTimer();
                return true;
            }
            redirectBack();
        }

        if (!this.isActive && this.started) {
            if (confirm("O seu pomodoro já foi iniciado, mudar de ítem irá resetar o pomodoro. Tem certeza?")) {
                this.resetTimer();
                return true;
            }
            redirectBack();
        }

        return true;
    }

    updatePercentage(percentage?: number): void {
        if (percentage) {
            this.percentage = percentage;
        }
        document.documentElement.style.setProperty('--percentage', this.percentage.toString());
    }

    calcPercentage(total: number, spent: number): number {
        const percentage = ((total - spent) / total) * 100;
        this.updatePercentage(percentage);
        return percentage;
    }

    updateItem() {
        this.service.updateItem(this.item);
    }

    updateTimer(): void {
        let _extraSeconds = this.initialTimer * 60 % 60;
        let _minutes = this.initialTimer;

        function setMinutesVisual(): string {
            if (_minutes < 1) return "00";

            if (_minutes < 10) return "0" + _minutes;

            return _minutes.toString();
        }

        function setSecondsVisual(): string {
            // If user set timer for minor than 1, will transform it into seconds
            if (_minutes < 1) return "0" + _minutes * 60;

            if (_extraSeconds < 10) return "0" + _extraSeconds;

            return _extraSeconds.toString();
        }

        this.minutes = setMinutesVisual();
        this.extraSeconds = setSecondsVisual();
    }

    resetTimerMode() {
        this.updateTimer()
        this.updatePercentage(100);
        this.pauseTimer();
        this.isActive = false;
        this.started = false;
    }

    resetTimer(): void {
        this.resetTimerMode();
        this.switchTimerMode("focus")
    }

    pauseTimer(): void {
        clearInterval(this.interval);
        this.isActive = false;
    }

    stopTimer() {
        this.pauseTimer();
        this.resetTimer();
    }

    startTimer(): void {
        this.isActive = true;
        this.started = true;
        this.updatePercentage(0);

        const total_time = (this.initialTimer * 60) + 1;
        if (this.sec === 0) this.sec = total_time;

        this.interval = setInterval(() => {
            this.sec--;

            this.percentage = this.calcPercentage(total_time, this.sec);
            this.updateTimer();

            // When times ends, shouts an alert
            if (this.percentage === 100) {
                this.isActive = false;
                this.item.complete = true;
                clearInterval(this.interval);
                this.updateItem();
                this.resetTimer();
                this.pauseTimer();
                this.updatePercentage(100);
                this.checkNextTimerMode();
                setTimeout(() => {
                    alert("🚨 It is Cool 😎. I wish you could share ");
                }, 1000);
            }
        }, 1000);
    }


    ngOnDestroy() {
        this.sub.unsubscribe();
    }

}