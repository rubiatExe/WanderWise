import { create } from 'zustand';

interface UserState {
    user: any | null;
    setUser: (user: any | null) => void;
}

interface SearchState {
    searchParams: {
        origin: string;
        destination: string;
        departureDate: Date | null;
        returnDate: Date | null;
        passengers: number;
        cabinClass: string;
    };
    setSearchParams: (params: Partial<SearchState['searchParams']>) => void;
}

interface AlertState {
    alerts: any[];
    addAlert: (alert: any) => void;
    setAlerts: (alerts: any[]) => void;
}

export const useUserStore = create<UserState>((set) => ({
    user: null,
    setUser: (user) => set({ user }),
}));

export const useSearchStore = create<SearchState>((set) => ({
    searchParams: {
        origin: '',
        destination: '',
        departureDate: null,
        returnDate: null,
        passengers: 1,
        cabinClass: 'economy',
    },
    setSearchParams: (params) =>
        set((state) => ({ searchParams: { ...state.searchParams, ...params } })),
}));

export const useAlertStore = create<AlertState>((set) => ({
    alerts: [],
    addAlert: (alert) => set((state) => ({ alerts: [alert, ...state.alerts].slice(0, 10) })),
    setAlerts: (alerts) => set({ alerts }),
}));
