import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {TimerService} from "../../timer.service";
import {IUser} from "../../../shared/interfaces/IUser";
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
    selector: 'app-config',
    templateUrl: './config.component.html',
    styleUrls: ['./config.component.scss']
})
export class ConfigComponent implements OnInit, OnDestroy {
    subs: Subscription;
    form: FormGroup;
    user!: IUser;

    private _focus: number;
    private _short: number;
    private _long: number;
    private _autoPause: boolean;
    private _autoPlay: boolean;


    constructor(
        private _route: ActivatedRoute,
        private _builder: FormBuilder,
        private _service: TimerService
    ) {

        this.subs = this._route.data.subscribe(
            ({user}) => {
                console.log(user);
                this.user = user;
            }
        );

        this._focus = this.user.timerSetting.focusTimer;
        this._short = this.user.timerSetting.shortPause;
        this._long = this.user.timerSetting.longPause;
        this._autoPause = this.user.autoPause;
        this._autoPlay = this.user.autoPlay;

        this.form = this._builder.group({
            focus: [this._focus],
            short: [this._short],
            long: [this._long],
            autoPause: [this._autoPause],
            autoPlay: [this._autoPlay]

        });
    }

    ngOnInit(): void {
    }

    test(e: any) {
        console.log(e);
    }

    getFocus() {
        return this._focus;
    }

    getShort() {
        return this._short;
    }

    getLong() {
        return this._long;
    }

    setFocus(num: number) {
        this._focus = num;
    }

    setShort(num: number) {
        this._short = num;
    }

    setLong(num: number) {
        this._long = num;
    }

    getAutoPause(): boolean {
        return this._autoPause;
    }

    getAutoPlay(): boolean {
        return this._autoPlay;
    }

    setAutoPause(val: boolean): void {
        this._autoPause = val;
    }

    setAutoPlay(val: boolean): void {
        this._autoPlay = val;
    }

    checkValue(val: string ): boolean {
        return this.form.get(val)?.value - 5 >= 0;
    }

    add(val: string) {
            this.form.controls[val].setValue(this.form.get(val)?.value + 5);
    }

    sub(val: string) {
        if (this.checkValue(val))
            this.form.controls[val].setValue(this.form.get(val)?.value - 5);
        else
            this.form.controls[val].setValue(0);
    }

    saveUser() {
        const _user:IUser = {
            name: "",
            items: [],
            timerSetting: {
                focusTimer: this.form.get('focus')?.value,
                shortPause: this.form.get('short')?.value,
                longPause: this.form.get('long')?.value
            },
            autoPause: this.form.get('autoPause')?.value,
            autoPlay: this.form.get('autoPlay')?.value
        }

        this._service.updateUser(_user)
    }

    ngOnDestroy() {
        this.subs.unsubscribe();
    }
}