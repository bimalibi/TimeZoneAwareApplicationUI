/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type TwoFactorRequest = {
    enable?: boolean | null;
    twoFactorCode?: string | null;
    resetSharedKey?: boolean;
    resetRecoveryCodes?: boolean;
    forgetMachine?: boolean;
};
