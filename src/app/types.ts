export type User = {
    username: string
    fullname: string,
    email: string,
    password: string
}

export enum Gender{
    MALE,
    FEMALE
}

export type CustomDate = {
    day: string
    month: string
    year: string
}

export type SleepingHours = {
    bedHour: number
    wakingHour: number
}

export type Contact = {
    phoneNumber: string
    name: string
}

export type FamilyStatus = {
    isMarried: boolean
    numberOfChildren: number
}

export enum TraumaType{
    SEX_ASSAULT,
    ARMY
}

export type MedicalInformation = {
    isTaking: boolean
    drugs: [string]
}

export type Address = {
    state: string
    city: string
    street: string
    apartment: string
}

export type UserInformation = {
    gender: Gender;
    phoneNumber: string;
    initialPanicAttackDate: CustomDate;
    sleep: SleepingHours;
    emergencyContacts: Contact[];
    isShabbatKeeper: boolean;
    isSmoking: boolean;
    familyStatus: FamilyStatus;
    traumaType: TraumaType;
    medicalInformation: MedicalInformation;
    address: Address;
    stressHours: number[];
    stressfullPlaces: string[];
}

export type Query = {
    login: boolean;
}

export type Mutation = {
}
