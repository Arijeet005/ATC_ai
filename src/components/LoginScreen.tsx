import React, { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card, CardContent, CardHeader } from "./ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { PawPrint, Brain } from "lucide-react";

interface LoginScreenProps {
  onLogin: () => void;
}

export function LoginScreen({ onLogin }: LoginScreenProps) {
  const [employeeId, setEmployeeId] = useState("");
  const [password, setPassword] = useState("");
  const [language, setLanguage] = useState("en");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (employeeId && password) {
      onLogin();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-white shadow-xl">
        <CardHeader className="text-center pb-4">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="bg-green-600 p-3 rounded-full">
              <PawPrint className="h-8 w-8 text-white" />
            </div>
            <div className="bg-blue-600 p-3 rounded-full">
              <Brain className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-2xl text-green-800 mb-2">
            ATC System
          </h1>
          <p className="text-green-600">
            AI-Driven Animal Type Classification
          </p>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label
              htmlFor="language"
              className="text-green-700"
            >
              Language / भाषा
            </Label>
            <Select
              value={language}
              onValueChange={setLanguage}
            >
              <SelectTrigger className="h-12 bg-green-50 border-green-200">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="hi">
                  हिंदी (Hindi)
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label
                htmlFor="employeeId"
                className="text-green-700"
              >
                {language === "hi"
                  ? "मोबाइल नंबर "
                  : "Mobile Number"}
              </Label>
              <Input
                id="employeeId"
                type="text"
                value={employeeId}
                onChange={(e) => setEmployeeId(e.target.value)}
                placeholder={
                  language === "hi"
                    ? "आपका आईडी दर्ज करें"
                    : "Enter your ID"
                }
                className="h-12 bg-green-50 border-green-200 focus:border-green-400"
                required
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="password"
                className="text-green-700"
              >
                {language === "hi" ? "पासवर्ड" : "Password"}
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={
                  language === "hi"
                    ? "पासवर्ड दर्ज करें"
                    : "Enter password"
                }
                className="h-12 bg-green-50 border-green-200 focus:border-green-400"
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full h-12 bg-green-600 hover:bg-green-700 text-white"
            >
              {language === "hi" ? "लॉगिन करें" : "Login"}
            </Button>

            <Button
              type="button"
              variant="ghost"
              className="w-full text-green-600 hover:text-green-700 hover:bg-green-50"
            >
              {language === "hi"
                ? "पासवर्ड भूल गए?"
                : "Forgot Password?"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}