"use client";
import { useState, useRef, useEffect } from "react";
import { ToolPageHeader } from "@/components/shared/tool-page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Download, Wifi, Mail, Phone } from "lucide-react";
import QRCode from "qrcode";

export default function QrGeneratorPage() {
  const [text, setText] = useState("https://developer-toolbox.dev");
  const [type, setType] = useState<"text" | "wifi" | "email" | "phone">("text");
  const [fgColor, setFgColor] = useState("#000000");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [size, setSize] = useState(300);
  const [ssid, setSsid] = useState("");
  const [password, setPassword] = useState("");
  const [encryption, setEncryption] = useState("WPA");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const getQrText = () => {
    if (type === "wifi") return `WIFI:S:${ssid};T:${encryption};P:${password};;`;
    if (type === "email") return `mailto:${email}?subject=${encodeURIComponent(subject)}`;
    if (type === "phone") return `tel:${text}`;
    return text;
  };

  useEffect(() => {
    if (canvasRef.current && getQrText()) {
      QRCode.toCanvas(canvasRef.current, getQrText(), { width: size, margin: 2, color: { dark: fgColor, light: bgColor } }).catch(() => {});
    }
  }, [text, fgColor, bgColor, size, type, ssid, password, email, subject]);

  const download = (fmt: "png" | "svg") => {
    if (fmt === "png" && canvasRef.current) {
      const a = document.createElement("a"); a.download = "qrcode.png"; a.href = canvasRef.current.toDataURL("image/png"); a.click();
    } else {
      QRCode.toString(getQrText(), { type: "svg", width: size, margin: 2, color: { dark: fgColor, light: bgColor } }).then((svg) => {
        const blob = new Blob([svg], { type: "image/svg+xml" }); const url = URL.createObjectURL(blob);
        const a = document.createElement("a"); a.download = "qrcode.svg"; a.href = url; a.click(); URL.revokeObjectURL(url);
      });
    }
  };

  return (
    <div>
      <ToolPageHeader name="QR Code Generator" description="Generate QR codes for text, URLs, WiFi, and more" icon="QrCode" slug="qr-generator" category="generator" />
        <div className="flex gap-2 mb-4"><Button variant="outline" size="sm" onClick={() => {setText('https://developer-toolbox.dev')}}>Load Demo</Button></div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <Tabs value={type} onValueChange={(v) => setType(v as typeof type)}>
            <TabsList>
              <TabsTrigger value="text">Text</TabsTrigger>
              <TabsTrigger value="wifi"><Wifi className="h-4 w-4 mr-1" /> WiFi</TabsTrigger>
              <TabsTrigger value="email"><Mail className="h-4 w-4 mr-1" /> Email</TabsTrigger>
              <TabsTrigger value="phone"><Phone className="h-4 w-4 mr-1" /> Phone</TabsTrigger>
            </TabsList>
            <TabsContent value="text"><Textarea placeholder="Enter text or URL..." value={text} onChange={(e) => setText(e.target.value)} className="min-h-[100px]" /></TabsContent>
            <TabsContent value="wifi" className="space-y-3">
              <div className="space-y-1"><Label>SSID</Label><Input placeholder="MyWiFi" value={ssid} onChange={(e) => setSsid(e.target.value)} /></div>
              <div className="space-y-1"><Label>Password</Label><Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} /></div>
              <div className="flex gap-2">{["WPA", "WEP", "nopass"].map((e) => <Button key={e} variant={encryption === e ? "default" : "outline"} size="sm" onClick={() => setEncryption(e)}>{e === "nopass" ? "None" : e}</Button>)}</div>
            </TabsContent>
            <TabsContent value="email" className="space-y-3">
              <div className="space-y-1"><Label>Email</Label><Input placeholder="user@example.com" value={email} onChange={(e) => setEmail(e.target.value)} /></div>
              <div className="space-y-1"><Label>Subject</Label><Input value={subject} onChange={(e) => setSubject(e.target.value)} /></div>
            </TabsContent>
            <TabsContent value="phone"><Input placeholder="+1234567890" value={text} onChange={(e) => setText(e.target.value)} /></TabsContent>
          </Tabs>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1"><Label>Foreground</Label><div className="flex gap-2"><input type="color" value={fgColor} onChange={(e) => setFgColor(e.target.value)} className="h-8 w-8 rounded cursor-pointer" /><Input value={fgColor} onChange={(e) => setFgColor(e.target.value)} className="h-8 text-xs font-mono" /></div></div>
            <div className="space-y-1"><Label>Background</Label><div className="flex gap-2"><input type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)} className="h-8 w-8 rounded cursor-pointer" /><Input value={bgColor} onChange={(e) => setBgColor(e.target.value)} className="h-8 text-xs font-mono" /></div></div>
          </div>
          <div className="space-y-1"><Label>Size: {size}px</Label><input type="range" min={100} max={1000} value={size} onChange={(e) => setSize(parseInt(e.target.value))} className="w-full" /></div>
        </div>
        <div className="flex flex-col items-center gap-4">
          <div className="rounded-2xl border border-border bg-white p-4"><canvas ref={canvasRef} /></div>
          <div className="flex gap-2">
            <Button onClick={() => download("png")} variant="outline" size="sm"><Download className="h-4 w-4" /> PNG</Button>
            <Button onClick={() => download("svg")} variant="outline" size="sm"><Download className="h-4 w-4" /> SVG</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
