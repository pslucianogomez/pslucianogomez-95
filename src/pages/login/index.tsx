import { useState } from "react";
//import { useLogin } from "@refinedev/core";
import axios from "axios";
import {
    Window,
    WindowHeader,
    WindowContent,
    TextInput,
    Button,
} from "react95";

import img from "../../assets/logo2.png";
import { localStorageHelper } from "../../constants";

interface ILoginForm {
    email: string;
    password: string;
}

export const LoginPage = () => {
    const [email, setemail] = useState("info@pslucianogomez.com.ar");
    const [password, setPassword] = useState("123456");

    const { mutate: login } = useLogin<ILoginForm>();

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                minHeight: "100vh",
                backgroundColor: "rgb(0, 128, 128)",
            }}
        >
            <Window>
                <WindowHeader active={true} className="window-header">
                    <span>Login</span>
                </WindowHeader>
                <div style={{ marginTop: 8 }}>
                    <img
                        src={img}
                        alt="refine-logo"
                        width={100}
                    />
                </div>
                <WindowContent>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            //login({ email, password });
                            localStorageHelper.setItem("isLogedIn", true);
                            window.location.href = "/";
                        }}
                    >
                        <div style={{ width: 500 }}>
                            <div style={{ display: "flex" }}>
                                <TextInput
                                    placeholder="User Name"
                                    fullWidth
                                    value={email}
                                    onChange={(e) => {
                                        setemail(e.target.value);
                                    }}
                                />
                            </div>
                            <br />
                            <TextInput
                                placeholder="Password"
                                fullWidth
                                type="password"
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                }}
                            />
                            <br />
                            <Button type="submit" value="login">
                                Sign in
                            </Button>
                        </div>
                    </form>
                </WindowContent>
            </Window>
        </div>
    );
};

function useLogin<T>(): { mutate: (data: T) => void } {
    const mutate = async (data: T) => {
        try {
            const response = await axios.post("/api/login", data);
            console.log("Login successful:", response.data);
        } catch (error) {
            console.error("Login failed:", error);
        }
    };

    return { mutate };
}


