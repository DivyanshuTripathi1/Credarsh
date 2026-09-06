import React, { useState } from "react";
import Hero from "./Hero";
import CreateTicket from "./CreateTicket";

function SupportPage() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div style={{ backgroundColor: "#ffffff", minHeight: "80vh" }}>
      {/* Hero section with real-time search & featured bulletins */}
      <Hero
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Topics directory with instant answers & search filtering */}
      <CreateTicket
        searchQuery={searchQuery}
        onResetSearch={() => setSearchQuery("")}
        onTagClick={(tag) => setSearchQuery(tag)}
      />
    </div>
  );
}

export default SupportPage;