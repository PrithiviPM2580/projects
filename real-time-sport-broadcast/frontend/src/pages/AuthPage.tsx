import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { Auth } from "@/types";
import { useState } from "react";

const AuthPage = () => {
  const [auth, setAuth] = useState<Auth>("login");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  return (
    <section className="wrapper">
      <Card className="card-switch">
        <Label className="switch">
          <Input type="checkbox" className="toggle" />
          <span className="slider"></span>
          <span className="card-side"></span>
          <div className="flip-card__inner">
            <div className="flip-card__front">
              <div className="title">Log in</div>
              <form className="flip-card__form" action="">
                <Input
                  className="flip-card__input"
                  name="email"
                  placeholder="Email"
                  type="email"
                />
                <Input
                  className="flip-card__input"
                  name="password"
                  placeholder="Password"
                  type="password"
                />
                <button className="flip-card__btn">Let`s go!</button>
              </form>
            </div>
            <div className="flip-card__back">
              <div className="title">Sign up</div>
              <form className="flip-card__form" action="">
                <Input
                  className="flip-card__input"
                  placeholder="Name"
                  type="name"
                />
                <Input
                  className="flip-card__input"
                  name="email"
                  placeholder="Email"
                  type="email"
                />
                <Input
                  className="flip-card__input"
                  name="password"
                  placeholder="Password"
                  type="password"
                />
                <button className="flip-card__btn">Confirm!</button>
              </form>
            </div>
          </div>
        </Label>
      </Card>
    </section>
  );
};

export default AuthPage;
