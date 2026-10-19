import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
    return new ImageResponse(
        (
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    padding: 88,
                    background: "#172554",
                    color: "#e2e8f0",
                }}
            >
                <div style={{ fontSize: 28, fontWeight: 600, color: "#3b82f6", letterSpacing: 3 }}>
                    QUALITY ASSURANCE
                </div>
                <div style={{ fontSize: 96, fontWeight: 700, marginTop: 24, lineHeight: 1.05 }}>
                    Muhammad Naufal Arif
                </div>
                <div style={{ fontSize: 32, marginTop: 32, color: "#94a3b8" }}>naufalarif.vercel.app</div>
            </div>
        ),
        size,
    );
}