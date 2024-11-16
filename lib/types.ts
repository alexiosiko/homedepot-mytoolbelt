export type DisplayPrice = {
    currencyIso: string;
    value: number;
    formattedValue: string;
    unitOfMeasureCode: string;
    unitOfMeasure: string;
};

export type OptimizedPrice = {
    productId: string;
    storeId: string;
    unitOfMeasureCode: string;
    displayPrice: DisplayPrice;
    lpc: boolean;
    productStatus: string;
};

export type StockInfo = {
    stockLevelStatus: string;
    stockLevel: number;
};

export type AisleBay = {
    productCode: string;
    storeId: string;
    storeDisplayName: string;
    bayLocation: string;
    aisleLocation: string;
};

export type FulfillmentMessages = {
    addToCart: string;
    findInStore: {
        displayStatus: string;
        storeStockLevel: number;
    };
    shipToHome: {
        availableForATC: boolean;
        displayStatus: string;
        shippingCostType: string;
        curbsideDelivery: boolean;
    };
    bopis: {
        availableForATC: boolean;
        displayStatus: string;
    };
    boss: {
        availableForATC: boolean;
        displayStatus: string;
    };
    express: {
        availableForATC: boolean;
        displayStatus: string;
    };
};

export type Inventory = {
    storeStock: {
        stockLevel: number;
        stockLevelStatus: string;
        soc: string;
    };
    onlineStock: {
        stockLevel: number;
        stockLevelStatus: string;
        soc: string;
    };
};

export type ProductData = {
    productId: string;
    storeId: string;
    unitOfMeasureCode: string;
    optimizedPrice: OptimizedPrice;
    storeStock: StockInfo;
    onlineStock: StockInfo;
    aisleBay: AisleBay;
    badges: any[]; // Adjust if specific badge structure is needed
    tags: any[]; // Adjust if specific tag structure is needed
    showZwas: boolean;
    bopis: boolean;
    boss: boolean;
    buyable: boolean;
    buyNow: boolean;
    id: string;
    isFromSap: boolean;
    shipToHome: boolean;
    isBopisOutOfAreaEnabled: boolean;
    promotionMessages: Record<string, unknown>; // Adjust if specific structure is known
    bodfs: boolean;
    isOnlineLocalized: boolean;
    isOnlineLocalizedToGivenStore: boolean;
    fulfillmentMessages: FulfillmentMessages;
    inventory: Inventory;
};


type ProductImage = {
    imageType: string;
    format: string;
    url: string;
    altText: string;
    code: string;
};

type PriceDetails = {
    productId: string;
    storeId: string;
    displayPrice: {
        currencyIso: string;
        value: number;
        formattedValue: string;
        unitOfMeasure: string;
        unitOfMeasureCode: string;
    };
    productStatus: string;
    lpc: boolean;
};

type Article = {
    manufacturer: string;
    code: string;
    name: string;
    url: string;
    modelNumber: string;
    images: ProductImage[];
    optimizedPrice: PriceDetails;
    ratings: number;
    reviews: number;
    articleType: string;
    admsLiteEligible: boolean;
};

export type PricingAndDataType = {
    anchorArticle: Article;
    supportingArticles: Article[];
};
