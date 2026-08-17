export type Flavour = {
  name: string;
  category: string;
  description: string;
  isVegan?: boolean;
  image?: string;
};

export type MenuItem = {
  name: string;
  description: string;
  price: string;
};


export const flavours: Flavour[] = [
  { name: "Vanille", category: "Klassiker", description: "Cremiges Bourbon-Vanilleeis." },
  { name: "Schokolade", category: "Klassiker", description: "Intensives dunkles Schokoladeneis." },
  { name: "Stracciatella", category: "Klassiker", description: "Fior di Latte mit feinen Schokosplittern." },
  { name: "Himbeere", category: "Fruchtig", description: "Fruchtiges Himbeersorbet.", isVegan: true },
  { name: "Zitrone", category: "Fruchtig", description: "Erfrischendes Zitronensorbet.", isVegan: true },
  { name: "Mango", category: "Fruchtig", description: "Exotisches Mangosorbet.", isVegan: true },
  { name: "Erdbeere", category: "Fruchtig", description: "Aus frischen Erdbeeren.", isVegan: true },
  { name: "Pistazie", category: "Cremig & Besonderes", description: "Original Bronte Pistaziengelato." },
  { name: "Haselnuss", category: "Cremig & Besonderes", description: "Geröstete Haselnuss aus dem Piemont." },
  { name: "Cookies", category: "Cremig & Besonderes", description: "Milcheis mit knusprigen Keksstücken." },
  { name: "Salted Caramel", category: "Cremig & Besonderes", description: "Karamell mit einer Prise Meersalz." },
  // Placeholders for remaining 7 flavours to reach ~18
  { name: "Joghurt-Maracuja", category: "Fruchtig", description: "Frischer Joghurt mit fruchtiger Maracuja." },
  { name: "Amarena", category: "Klassiker", description: "Fior di Latte mit Amarenakirschen." },
  { name: "Kaffee", category: "Cremig & Besonderes", description: "Aus frisch geröstetem Elbgold-Espresso." },
  { name: "Minze-Schoko", category: "Klassiker", description: "Erfrischendes Minzeis mit Schokostücken." },
  { name: "Zimt", category: "Cremig & Besonderes", description: "Warmes Zimteis, perfekt für jede Jahreszeit." },
  { name: "Waldmeister", category: "Klassiker", description: "Der grüne Klassiker für Kinder und Erwachsene." },
  { name: "Kokosnuss", category: "Cremig & Besonderes", description: "Cremiges Kokoseis mit echten Raspeln." },
];

export const coffeeMenu = [
  { name: "Espresso", description: "Kräftig und aromatisch", price: "2,20 €" },
  { name: "Espresso Macchiato", description: "Espresso mit einem Schuss Milchschaum", price: "2,50 €" },
  { name: "Americano", description: "Verlängerter Espresso", price: "2,80 €" },
  { name: "Cappuccino", description: "Mit cremigem Milchschaum", price: "3,50 €" },
  { name: "Flat White", description: "Doppelter Ristretto mit feinem Mikroschaum", price: "3,80 €" },
  { name: "Latte Macchiato", description: "Viel Milch, weicher Espresso", price: "3,90 €" },
];
