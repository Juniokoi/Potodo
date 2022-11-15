import {IItem} from "./IItem";

export interface IUser {
    name: string,
    items: IItem[],
    timerSetting: {
        focusTimer: number,
        shortPause: number,
        longPause: number
    }
    autoPause: boolean,
    autoPlay: boolean
}