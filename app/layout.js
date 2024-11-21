import { Orbitron } from "next/font/google";
import "./globals.css";

const globalNextFont = Orbitron({
    subsets: ["latin"],
});

export const metadata = {
    title: "World Clock",
    description: "Une horloge mondiale simple et élégante.",
};

export default function RootLayout({children}) {
    return (
        <html lang="en">
            <body className={`${globalNextFont.className} overflow-hidden antialiased`}>
                {children}
            </body>
        </html>
    );
}
