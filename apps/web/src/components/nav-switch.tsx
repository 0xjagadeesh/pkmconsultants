"use client";

import { useEffect, useState } from "react";

import { Navbar } from "@/components/navbar";
import { NavbarV2 } from "@/components/navbar-v2";

const KEY = "pkm-nav-preview";

/**
 * Temporary preview switch while NavbarV2 is reviewed.
 * Add ?nav=v2 to any URL to use the new navbar (remembered in this browser),
 * ?nav=v1 to go back. Everyone else keeps the current Navbar.
 * Remove this file and render the chosen navbar directly once decided.
 */
export function NavSwitch() {
  const [useV2, setUseV2] = useState(false);

  useEffect(() => {
    try {
      const param = new URLSearchParams(window.location.search).get("nav");
      if (param === "v2") window.localStorage.setItem(KEY, "v2");
      if (param === "v1") window.localStorage.removeItem(KEY);
      setUseV2(window.localStorage.getItem(KEY) === "v2");
    } catch {
      setUseV2(new URLSearchParams(window.location.search).get("nav") === "v2");
    }
  }, []);

  return useV2 ? <NavbarV2 /> : <Navbar />;
}
