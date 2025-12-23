import React, { Dispatch } from 'react';

type RegisterAction = {
  type: 'REGISTER';
  language: any;
  notifications: any;
};

type UpdateBottomTileStatusAction = {
  type: 'UPDATE_BOTTOMTILE_STATUS';
  bottomTileStatus: boolean;
};

type UpdateLanguageAction = {
  type: 'UPDATE_LANGUAGE';
  language: any;
};

type SetLanguageAction = {
  type: 'SET_LANGUAGE';
  setLang: boolean;
};

type UpdateBadgeStatusAction = {
  type: 'UPDATE_BADGE_STATUS';
  badgeStatus: boolean;
};

type NotificationUpdateAction = {
  type: 'NOTIFICATION_UPDATE';
  notificationUpdate: any;
};

type ApnTokenAction = {
  type: 'APN_TOKEN';
  apnsToken: string;
};

export type AuthAction =
  | RegisterAction
  | UpdateBottomTileStatusAction
  | UpdateLanguageAction
  | SetLanguageAction
  | UpdateBadgeStatusAction
  | NotificationUpdateAction
  | ApnTokenAction;

export interface AuthState {
  language: any;
  notifications: any;
  bottomTileStatus: boolean;
  setLang: boolean;
  badgeStatus: boolean;
  notificationUpdate: any;
  apnsToken: string;
}

export const initialState: AuthState = {
  language: null,
  notifications: null,
  bottomTileStatus: true,
  setLang: false,
  badgeStatus: false,
  notificationUpdate: null,
  apnsToken: '',
};

export const loginReducer = (
  prevState: AuthState,
  action: AuthAction,
): AuthState => {
  switch (action.type) {
    case 'REGISTER':
      return {
        ...prevState,
        language: action.language,
        notifications: action.notifications,
      };
    case 'UPDATE_BOTTOMTILE_STATUS':
      return {
        ...prevState,
        bottomTileStatus: action.bottomTileStatus,
      };
    case 'UPDATE_LANGUAGE':
      return {
        ...prevState,
        language: action.language,
      };
    case 'SET_LANGUAGE':
      return {
        ...prevState,
        setLang: action.setLang,
      };
    case 'UPDATE_BADGE_STATUS':
      return {
        ...prevState,
        badgeStatus: action.badgeStatus,
      };
    case 'NOTIFICATION_UPDATE':
      return {
        ...prevState,
        notificationUpdate: action.notificationUpdate,
      };
    case 'APN_TOKEN':
      return {
        ...prevState,
        apnsToken: action.apnsToken,
      };
    default:
      return prevState;
  }
};

export interface AuthContextValue {
  dispatch: Dispatch<AuthAction>;
  state: AuthState;
  // Preserve legacy shape expected by some JS components
  loginState?: AuthState;
}

export const AuthContext = React.createContext<AuthContextValue | undefined>(undefined);
