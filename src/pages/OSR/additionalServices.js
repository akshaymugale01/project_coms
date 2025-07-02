import axiosInstance from "../../api/axiosInstance";
import axiosInstance2 from "../../api/axiosInstance2";
import { getItemInLocalStorage } from "../../utils/localStorage";

export const unitConfigurationService = {
  getAll: () => {
    const token = getItemInLocalStorage("TOKEN");
    const cleanToken = token ? token.replace('Bearer ', '') : '';
    return axiosInstance2.get(`/unit_configurations?token=${cleanToken}`);
  },
  getById: (id) => {
    const token = getItemInLocalStorage("TOKEN");
    const cleanToken = token ? token.replace('Bearer ', '') : '';
    return axiosInstance2.get(`/unit_configurations/${id}?token=${cleanToken}`);
  },
  create: (data) => {
    console.log('Sending unit config create data:', data);
    const token = getItemInLocalStorage("TOKEN");
    const cleanToken = token ? token.replace('Bearer ', '') : '';
    console.log('Using token:', cleanToken);
    return axiosInstance2.post(`/unit_configurations?token=${cleanToken}`, data);
  },
  update: (id, data) => {
    console.log('Sending unit config update data:', data);
    const token = getItemInLocalStorage("TOKEN");
    const cleanToken = token ? token.replace('Bearer ', '') : '';
    return axiosInstance2.put(`/unit_configurations/${id}?token=${cleanToken}`, data);
  },
  delete: (id) => {
    const token = getItemInLocalStorage("TOKEN");
    const cleanToken = token ? token.replace('Bearer ', '') : '';
    return axiosInstance2.delete(`/unit_configurations/${id}?token=${cleanToken}`);
  },
};

export const serviceCategoryService = {
  getAll: () => {
    const token = getItemInLocalStorage("TOKEN");
    return axiosInstance.get(`/service_categories.json?token=${token}`);
  },
  getById: (id) => {
    const token = getItemInLocalStorage("TOKEN");
    const cleanToken = token ? token.replace('Bearer ', '') : '';
    return axiosInstance.get(`/service_categories/${id}.json?token=${cleanToken}`);
  },
  create: (data) => {
    console.log('Sending category create data:', data);
    const payload = { service_category: data };
    console.log('Final payload:', payload);
    const token = getItemInLocalStorage("TOKEN");
    const cleanToken = token ? token.replace('Bearer ', '') : '';
    return axiosInstance.post(`/service_categories.json?token=${cleanToken}`, payload);
  },
  update: (id, data) => {
    console.log('Sending category update data:', data);
    const payload = { service_category: data };
    console.log('Final payload:', payload);
    const token = getItemInLocalStorage("TOKEN");
    const cleanToken = token ? token.replace('Bearer ', '') : '';
    return axiosInstance.put(`/service_categories/${id}.json?token=${cleanToken}`, payload);
  },
  delete: (id) => {
    const token = getItemInLocalStorage("TOKEN");
    const cleanToken = token ? token.replace('Bearer ', '') : '';
    return axiosInstance.delete(`/service_categories/${id}.json?token=${cleanToken}`);
  },
};

export const serviceSubcategoryService = {
  getAll: () => {
    const token = getItemInLocalStorage("TOKEN");
    const cleanToken = token ? token.replace('Bearer ', '') : '';
    return axiosInstance.get(`/service_subcategories.json?token=${cleanToken}`);
  },
  getById: (id) => {
    const token = getItemInLocalStorage("TOKEN");
    const cleanToken = token ? token.replace('Bearer ', '') : '';
    return axiosInstance.get(`/service_subcategories/${id}.json?token=${cleanToken}`);
  },
  getByCategoryId: (categoryId) => {
    const token = getItemInLocalStorage("TOKEN");
    const cleanToken = token ? token.replace('Bearer ', '') : '';
    return axiosInstance.get(`/service_subcategories.json?category_id=${categoryId}&token=${cleanToken}`);
  },
  create: (data) => {
    console.log('Sending subcategory create data:', data);
    const payload = { service_subcategory: data };
    console.log('Final payload:', payload);
    const token = getItemInLocalStorage("TOKEN");
    const cleanToken = token ? token.replace('Bearer ', '') : '';
    return axiosInstance.post(`/service_subcategories.json?token=${cleanToken}`, payload);
  },
  update: (id, data) => {
    console.log('Sending subcategory update data:', data);
    const payload = { service_subcategory: data };
    console.log('Final payload:', payload);
    const token = getItemInLocalStorage("TOKEN");
    const cleanToken = token ? token.replace('Bearer ', '') : '';
    return axiosInstance.put(`/service_subcategories/${id}.json?token=${cleanToken}`, payload);
  },
  delete: (id) => {
    const token = getItemInLocalStorage("TOKEN");
    const cleanToken = token ? token.replace('Bearer ', '') : '';
    return axiosInstance.delete(`/service_subcategories/${id}.json?token=${cleanToken}`);
  },
};

export const serviceSlotService = {
  getAll: () => {
    const token = getItemInLocalStorage("TOKEN");
    const cleanToken = token ? token.replace('Bearer ', '') : '';
    // Since slots are nested under subcategories, we'll get all slots across all subcategories
    // Alternative: you might want to create a custom route for all slots
    return axiosInstance.get(`/service_subcategories/service_slots.json?token=${cleanToken}`);
  },
  getById: (id) => {
    const token = getItemInLocalStorage("TOKEN");
    const cleanToken = token ? token.replace('Bearer ', '') : '';
    // With shallow: true, individual slots can be accessed directly
    return axiosInstance.get(`/service_slots/${id}.json?token=${cleanToken}`);
  },
  getBySubcategoryId: (subcategoryId) => {
    const token = getItemInLocalStorage("TOKEN");
    const cleanToken = token ? token.replace('Bearer ', '') : '';
    // This uses the nested route to get slots for a specific subcategory
    return axiosInstance.get(`/service_subcategories/${subcategoryId}/service_slots.json?token=${cleanToken}`);
  },
  getAvailableSlots: (subcategoryId, date) => {
    const token = getItemInLocalStorage("TOKEN");
    const cleanToken = token ? token.replace('Bearer ', '') : '';
    // This uses the member route defined in your routes
    return axiosInstance.get(`/service_subcategories/${subcategoryId}/available_slots.json?date=${date}&token=${cleanToken}`);
  },
  create: (data) => {
    console.log('Sending slot create data:', data);
    const payload = { service_slot: data };
    console.log('Final payload:', payload);
    const token = getItemInLocalStorage("TOKEN");
    const cleanToken = token ? token.replace('Bearer ', '') : '';
    // Create through the nested route
    return axiosInstance.post(`/service_subcategories/${data.service_subcategory_id}/service_slots.json?token=${cleanToken}`, payload);
  },
  update: (id, data) => {
    console.log('Sending slot update data:', data);
    const payload = { service_slot: data };
    console.log('Final payload:', payload);
    const token = getItemInLocalStorage("TOKEN");
    const cleanToken = token ? token.replace('Bearer ', '') : '';
    // With shallow: true, can update directly
    return axiosInstance.put(`/service_slots/${id}.json?token=${cleanToken}`, payload);
  },
  delete: (id) => {
    const token = getItemInLocalStorage("TOKEN");
    const cleanToken = token ? token.replace('Bearer ', '') : '';
    // With shallow: true, can delete directly
    return axiosInstance.delete(`/service_slots/${id}.json?token=${cleanToken}`);
  },
  bulkCreate: (data) => {
    const token = getItemInLocalStorage("TOKEN");
    const cleanToken = token ? token.replace('Bearer ', '') : '';
    // Since there's no bulk_create route for slots in your routes, 
    // we'll need to create individual slots or add a custom route
    // For now, let's try using the regular create route multiple times
    console.log('Bulk create data:', data);
    return axiosInstance.post(`/service_subcategories/${data.service_subcategory_id}/service_slots.json?token=${cleanToken}`, data);
  },
};

export const servicePricingService = {
  getAll: () => {
    const token = getItemInLocalStorage("TOKEN");
    const cleanToken = token ? token.replace('Bearer ', '') : '';
    // Since pricing is nested under subcategories, we'll get all pricing across all subcategories
    return axiosInstance.get(`/service_subcategories/service_pricings.json?token=${cleanToken}`);
  },
  getById: (id) => {
    const token = getItemInLocalStorage("TOKEN");
    const cleanToken = token ? token.replace('Bearer ', '') : '';
    // With shallow: true, individual pricing can be accessed directly
    return axiosInstance.get(`/service_pricings/${id}.json?token=${cleanToken}`);
  },
  getBySubcategoryId: (subcategoryId) => {
    const token = getItemInLocalStorage("TOKEN");
    const cleanToken = token ? token.replace('Bearer ', '') : '';
    // This uses the nested route to get pricing for a specific subcategory
    return axiosInstance.get(`/service_subcategories/${subcategoryId}/service_pricings.json?token=${cleanToken}`);
  },
  getPricingInfo: (subcategoryId, unitConfigurationId) => {
    const token = getItemInLocalStorage("TOKEN");
    const cleanToken = token ? token.replace('Bearer ', '') : '';
    // This uses the member route defined in your routes
    return axiosInstance.get(`/service_subcategories/${subcategoryId}/pricing_info.json?unit_configuration_id=${unitConfigurationId}&token=${cleanToken}`);
  },
  create: (data) => {
    console.log('Sending pricing create data:', data);
    const payload = { service_pricing: data };
    console.log('Final payload:', payload);
    const token = getItemInLocalStorage("TOKEN");
    const cleanToken = token ? token.replace('Bearer ', '') : '';
    // Create through the nested route
    return axiosInstance.post(`/service_subcategories/${data.service_subcategory_id}/service_pricings.json?token=${cleanToken}`, payload);
  },
  update: (id, data) => {
    console.log('Sending pricing update data:', data);
    const payload = { service_pricing: data };
    console.log('Final payload:', payload);
    const token = getItemInLocalStorage("TOKEN");
    const cleanToken = token ? token.replace('Bearer ', '') : '';
    // With shallow: true, can update directly
    return axiosInstance.put(`/service_pricings/${id}.json?token=${cleanToken}`, payload);
  },
  delete: (id) => {
    const token = getItemInLocalStorage("TOKEN");
    const cleanToken = token ? token.replace('Bearer ', '') : '';
    // With shallow: true, can delete directly
    return axiosInstance.delete(`/service_pricings/${id}.json?token=${cleanToken}`);
  },
  bulkCreate: (data) => {
    const token = getItemInLocalStorage("TOKEN");
    const cleanToken = token ? token.replace('Bearer ', '') : '';
    // Use the collection route for bulk_create
    return axiosInstance.post(`/service_pricings/bulk_create.json?token=${cleanToken}`, data);
  },
};

export const serviceBookingService = {
  getAll: () => {
    const token = getItemInLocalStorage("TOKEN");
    const cleanToken = token ? token.replace('Bearer ', '') : '';
    return axiosInstance.get(`/service_bookings.json?token=${cleanToken}`);
  },
  getById: (id) => {
    const token = getItemInLocalStorage("TOKEN");
    const cleanToken = token ? token.replace('Bearer ', '') : '';
    return axiosInstance.get(`/service_bookings/${id}.json?token=${cleanToken}`);
  },
  getUserBookings: (userId) => {
    const token = getItemInLocalStorage("TOKEN");
    const cleanToken = token ? token.replace('Bearer ', '') : '';
    return axiosInstance.get(`/service_bookings.json?user_id=${userId}&token=${cleanToken}`);
  },
  create: (data) => {
    console.log('Creating service booking:', data);
    const payload = { service_booking: data };
    console.log('Final booking payload:', payload);
    const token = getItemInLocalStorage("TOKEN");
    const cleanToken = token ? token.replace('Bearer ', '') : '';
    return axiosInstance.post(`/service_bookings.json?token=${cleanToken}`, payload);
  },
  update: (id, data) => {
    const token = getItemInLocalStorage("TOKEN");
    const cleanToken = token ? token.replace('Bearer ', '') : '';
    return axiosInstance.put(`/service_bookings/${id}.json?token=${cleanToken}`, data);
  },
  cancel: (id) => {
    const token = getItemInLocalStorage("TOKEN");
    const cleanToken = token ? token.replace('Bearer ', '') : '';
    return axiosInstance.patch(`/service_bookings/${id}/cancel.json?token=${cleanToken}`);
  },
  complete: (id) => {
    const token = getItemInLocalStorage("TOKEN");
    const cleanToken = token ? token.replace('Bearer ', '') : '';
    return axiosInstance.patch(`/service_bookings/${id}/complete.json?token=${cleanToken}`);
  },
  addRating: (id, rating, review) => {
    const token = getItemInLocalStorage("TOKEN");
    const cleanToken = token ? token.replace('Bearer ', '') : '';
    return axiosInstance.patch(`/service_bookings/${id}/rate.json?token=${cleanToken}`, { rating, review });
  },
};

// New service for getting pricing with query parameters
export const servicePricingQueryService = {
  getAll: () => {
    const token = getItemInLocalStorage("TOKEN");
    const cleanToken = token ? token.replace('Bearer ', '') : '';
    return axiosInstance.get(`/service_pricings.json?token=${cleanToken}`);
  },
  getBySubcategory: (subcategoryId) => {
    const token = getItemInLocalStorage("TOKEN");
    const cleanToken = token ? token.replace('Bearer ', '') : '';
    return axiosInstance.get(`/service_pricings.json?subcategory_id=${subcategoryId}&token=${cleanToken}`);
  },
};
