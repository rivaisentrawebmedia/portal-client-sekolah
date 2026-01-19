import { createContext, useContext, useState, type ReactNode } from "react";

type headerContextType = {
	title: string;
	setTitle: (data: string) => void;
};

const HeaderContext = createContext<headerContextType | undefined>(undefined);

export const HeaderProvider = ({ children }: { children: ReactNode }) => {
	const [title, setTitle] = useState<string>("");
	return (
		<HeaderContext.Provider value={{ title, setTitle }}>
			{children}
		</HeaderContext.Provider>
	);
};

export const useHeaderTitle = () => {
	const context = useContext(HeaderContext);
	if (!context) {
		throw new Error("Terdapat masalah di dalam <HeaderProvider>");
	}
	return context;
};
