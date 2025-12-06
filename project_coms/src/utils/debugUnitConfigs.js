// Debug utility for unit configurations
import { unitConfigurationService } from "../pages/OSR/additionalServices";

export const debugUnitConfigurations = async () => {
  try {
    console.log("=== Debugging Unit Configurations ===");
    
    // Test the API call
    const response = await unitConfigurationService.getAll();
    console.log("Raw API response:", response);
    console.log("Response data:", response.data);
    console.log("Data type:", typeof response.data);
    console.log("Is array:", Array.isArray(response.data));
    
    if (response.data && Array.isArray(response.data)) {
      console.log("Number of unit configs:", response.data.length);
      response.data.forEach((config, index) => {
        console.log(`Config ${index + 1}:`, {
          id: config.id,
          idType: typeof config.id,
          name: config.name,
          fullObject: config
        });
      });
    } else {
      console.log("Unit configurations data is not an array or is empty");
    }
    
    console.log("=== End Debug ===");
    return response.data;
  } catch (error) {
    console.error("Error fetching unit configurations:", error);
    return [];
  }
};
