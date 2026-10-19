import { ImageResponse } from "next/og";

export const size = { width: 512, height: 512 };
export const contentType = "image/png";

export default function Icon() {
    return new ImageResponse(
        (
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "transparent",
                }}
            >
                <div
                    style={{
                        width: 500,
                        height: 500,
                        borderRadius: 120,
                        background: "#172554",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#ffffff",
                        fontSize: 200,
                        fontWeight: 650,
                    }}
                >
                    NA
                </div>
            </div>
        ),
        size,
    );
}