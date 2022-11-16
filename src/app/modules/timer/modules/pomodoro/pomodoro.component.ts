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

    user: IUser = this.service.getUserSettings();
    private _focusTime = this.user.timerSetting.focusTimer;

    editMode: boolean = false;
    mouseActive: boolean = false;
    currentMode: TimerMode = TimerMode.focus;
    pomodoroMaxSessions: number = 6;
    pomodoroLongPause: number = 4;
    pomodoroCurrentSection: number = 1;
    autoPlay: boolean = this.user.autoPlay;
    autoPause: boolean = this.user.autoPause;

    interval: any;
    isActive: boolean = false;
    started: boolean = false;

    percentage: number = 100;

    minutes!: string;
    extraSeconds!: string;

    sec!: number;
    initSec: number;

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

        this.initSec = this.sec = (this._focusTime * 60);

        this.updateTimer();
    }

    ngOnInit(): void {
    }

    checkNextTimerMode() {
        if (this.currentMode === 'focus') {
            this.pomodoroCurrentSection++;

            if (this.pomodoroLongPause > this.pomodoroCurrentSection) {
                this.switchTimerMode('shortPause');
            } else {
                this.switchTimerMode('longPause');
                this.pomodoroCurrentSection = 0;
            }

            if (this.autoPause) {
                this.startTimer();
            }

        } else {
            this.switchTimerMode('focus');

            if (this.autoPlay) {
                this.startTimer();
            }
        }
        console.log(this.pomodoroLongPause, this.pomodoroCurrentSection);
    }

    applyTimerStyles(itemMode: string) {
        return {
            'active': itemMode === this.currentMode,
            'notActive': itemMode !== this.currentMode
        };
    }

    switchTimerMode(value: string) {
        const {focusTimer, shortPause, longPause} = this.user.timerSetting;
        switch (value) {
            case 'focus':
                this.currentMode = TimerMode.focus;
                this.applyTimerStyles('focus');
                this.setSec(focusTimer);
                break;
            case 'shortPause':
                this.currentMode = TimerMode.shortPause;
                this.applyTimerStyles('shortPause');
                this.setSec(shortPause);
                break;
            case 'longPause':
                this.currentMode = TimerMode.longPause;
                this.applyTimerStyles('longPause');
                this.setSec(longPause);
                break;
            default:
                throw new Error("Invalid input inserted");
        }
        this.updateTimer();
    }

    onClickChangeMode(value: string) {
        this.switchTimerMode(value);
        this.resetTimer();
    }

    loseFocus() {
        if (!this.mouseActive) {
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

    setSec(val: number) {
        this.initSec = this.sec = val * 60;
    }

    updatePercentage(percentage?: number): void {
        if (percentage) {
            this.percentage = percentage;
        }
        document.documentElement.style.setProperty('--percentage', this.percentage.toString());
    }

    calcPercentage(spent: number): number {
        const percentage = ((this.initSec - spent) / this.initSec) * 100;
        this.updatePercentage(percentage);
        return percentage;
    }

    updateItem() {
        this.service.updateItem(this.item);
    }

    updateTimer(): void {
        let _extraSeconds = this.sec % 60;
        let _minutes = Math.floor(this.sec / 60);

        function setMinutesVisual(): string {
            if (_minutes < 10) return "0" + _minutes;
            return _minutes.toString();
        }

        function setSecondsVisual(): string {
            if (_extraSeconds < 10) return "0" + _extraSeconds;
            return _extraSeconds.toString();
        }

        this.minutes = setMinutesVisual();
        this.extraSeconds = setSecondsVisual();
    }

    resetTimer(): void {
        this.started = false;

        this.pauseTimer();
        this.updateTimer();
        this.updatePercentage(100);
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

        if (!this.started) {
            this.started = true;
            this.updatePercentage(0);
        }

        this.interval = setInterval(() => {
            this.sec--;

            this.percentage = this.calcPercentage(this.sec);
            this.updateTimer();

            // When times ends, shouts an alert
            if (this.percentage === 100) {
                this.item.complete = true;
                this.updateItem();
                this.stopTimer();
                this.updatePercentage(100);
                this.checkNextTimerMode();
                console.log("🚨 It is Cool 😎. I wish you could share ");
            }
        }, 1000);
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }
}