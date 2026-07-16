export const categories = {
  'Bekleidung': ['Blazer','Bluse','Hemd','Jacke','Kleid','Mantel','Pullover','Rock','Top','Hose','Jeans','Jumpsuit','Weste'],
  'Taschen': ['Handtasche','Schultertasche','Crossbody','Clutch','Shopper','Rucksack','Reisetasche'],
  'Schuhe': ['Pumps','Stiefeletten','Stiefel','Sneaker','Loafer','Sandalen','Ballerinas'],
  'Accessoires': ['Schal','Tuch','Gürtel','Hut','Sonnenbrille','Handschuhe','Schmuck'],
} as const;

export const designerSuggestions = [
  'Alaïa','Balenciaga','Burberry','Celine','Chanel','Christian Dior','Fendi','Givenchy','Gucci','Hermès','Isabel Marant','Loewe','Louis Vuitton','Max Mara','Miu Miu','Moncler','Prada','Saint Laurent','Sandro','Valentino','Versace'
];

export type CategoryName = keyof typeof categories;
