import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const POPUP_DISMISSED_KEY = "ck444_popup_dismissed";

const PromoPopup = () => {
  const [show, setShow] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    const dismissed = localStorage.getItem(POPUP_DISMISSED_KEY);
    if (dismissed === "true") return;

    const fetchPopup = async () => {
      const { data } = await supabase
        .from("site_settings")
        .select("key, value")
        .in("key", ["popup_enabled", "popup_image_url"]);

      if (!data) return;
      const enabled = data.find((d) => d.key === "popup_enabled")?.value;
      const url = data.find((d) => d.key === "popup_image_url")?.value;

      if (enabled === "true" && url) {
        setImageUrl(url);
        setShow(true);
      }
    };
    fetchPopup();
  }, []);

  const handleClose = () => {
    setShow(false);
    localStorage.setItem(POPUP_DISMISSED_KEY, "true");
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4"
          onClick={handleClose}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", damping: 20 }}
            className="relative max-w-2xl w-full max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={handleClose}
              className="absolute -top-3 -right-3 z-10 w-9 h-9 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center hover:bg-destructive/80 transition-colors shadow-lg"
            >
              <X className="h-5 w-5" />
            </button>
            <img
              src={imageUrl}
              alt="Promotion"
              className="w-full h-auto rounded-xl shadow-2xl border-2 border-secondary/50"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PromoPopup;
