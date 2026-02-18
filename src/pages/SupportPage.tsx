import { useLanguage } from "@/i18n/LanguageContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Headphones, MessageCircle, Mail, Phone } from "lucide-react";

const SupportPage = () => {
  const { language } = useLanguage();
  return (
    <div className="px-4 py-6 max-w-2xl mx-auto">
      <div className="flex items-center gap-2 mb-6">
        <Headphones className="h-6 w-6 text-secondary" />
        <h1 className="font-display text-2xl font-black text-secondary neon-text-gold">
          {language === "bn" ? "সাপোর্ট" : "Support"}
        </h1>
      </div>

      <div className="grid sm:grid-cols-3 gap-3 mb-8">
        {[
          { icon: MessageCircle, label: language === "bn" ? "লাইভ চ্যাট" : "Live Chat", desc: language === "bn" ? "২৪/৭ অনলাইন" : "24/7 Online" },
          { icon: Mail, label: language === "bn" ? "ইমেইল" : "Email", desc: "support@ck444.com" },
          { icon: Phone, label: language === "bn" ? "ফোন" : "Phone", desc: "+880-XXXX-XXXX" },
        ].map((ch) => (
          <Card key={ch.label} className="border-secondary/20 hover:border-secondary/50 transition-all cursor-pointer">
            <CardContent className="p-4 flex flex-col items-center text-center gap-2">
              <ch.icon className="h-8 w-8 text-secondary" />
              <p className="font-semibold text-sm">{ch.label}</p>
              <p className="text-[11px] text-muted-foreground">{ch.desc}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-border">
        <CardHeader>
          <CardTitle className="text-sm">{language === "bn" ? "সাপোর্ট টিকেট জমা দিন" : "Submit a Ticket"}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input placeholder={language === "bn" ? "বিষয়" : "Subject"} className="bg-card" />
          <Textarea placeholder={language === "bn" ? "আপনার সমস্যা বর্ণনা করুন..." : "Describe your issue..."} className="bg-card min-h-[120px]" />
          <Button className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 font-bold">
            {language === "bn" ? "জমা দিন" : "Submit"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default SupportPage;
