// Sample unit configurations for testing - matching backend structure
export const sampleUnitConfigurations = [
  {
    id: 1,
    name: "1 BHK",
    description: "One bedroom apartment",
    bedrooms: 1,
    bathrooms: 1,
    halls: 1,
    kitchens: 1,
    carpet_area: 600,
    built_up_area: 650,
    active: true,
    site_id: 55,
    created_at: "2025-07-03 12:00:00",
    updated_at: "2025-07-03 12:00:00"
  },
  {
    id: 2,
    name: "2 BHK", 
    description: "Two bedroom apartment",
    bedrooms: 2,
    bathrooms: 2,
    halls: 1,
    kitchens: 1,
    carpet_area: 900,
    built_up_area: 950,
    active: true,
    site_id: 55,
    created_at: "2025-07-03 12:00:00",
    updated_at: "2025-07-03 12:00:00"
  },
  {
    id: 3,
    name: "3 BHK",
    description: "Three bedroom apartment",
    bedrooms: 3,
    bathrooms: 2,
    halls: 1,
    kitchens: 1,
    carpet_area: 1200,
    built_up_area: 1250,
    active: true,
    site_id: 55,
    created_at: "2025-07-03 12:00:00",
    updated_at: "2025-07-03 12:00:00"
  },
  {
    id: 4,
    name: "Studio",
    description: "Studio apartment",
    bedrooms: 0,
    bathrooms: 1,
    halls: 0,
    kitchens: 1,
    carpet_area: 400,
    built_up_area: 450,
    active: true,
    site_id: 55,
    created_at: "2025-07-03 12:00:00",
    updated_at: "2025-07-03 12:00:00"
  }
];

// Helper function to simulate API response
export const createSampleUnitConfigResponse = () => ({
  data: sampleUnitConfigurations
});
