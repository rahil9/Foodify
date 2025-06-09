package com.example.dto;

import java.math.BigDecimal;
import java.util.List;

public class RestaurantRequest {
    private String name;
    private BigDecimal rating;
    private String address;
    private String location;
    private String category;
    private String description;
    private BigDecimal minOrderAmount;
    private Integer deliveryTime;
    private String image;
    private List<MenuItemRequest> menuItems;

    public RestaurantRequest() {
    }

    public RestaurantRequest(String name, BigDecimal rating, String address, String location, String category,
            String description, BigDecimal minOrderAmount, Integer deliveryTime, String image,
            List<MenuItemRequest> menuItems) {
        this.name = name;
        this.rating = rating;
        this.address = address;
        this.location = location;
        this.category = category;
        this.description = description;
        this.minOrderAmount = minOrderAmount;
        this.deliveryTime = deliveryTime;
        this.image = image;
        this.menuItems = menuItems;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public BigDecimal getRating() {
        return rating;
    }

    public void setRating(BigDecimal rating) {
        this.rating = rating;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public BigDecimal getMinOrderAmount() {
        return minOrderAmount;
    }

    public void setMinOrderAmount(BigDecimal minOrderAmount) {
        this.minOrderAmount = minOrderAmount;
    }

    public Integer getDeliveryTime() {
        return deliveryTime;
    }

    public void setDeliveryTime(Integer deliveryTime) {
        this.deliveryTime = deliveryTime;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public List<MenuItemRequest> getMenuItems() {
        return menuItems;
    }

    public void setMenuItems(List<MenuItemRequest> menuItems) {
        this.menuItems = menuItems;
    }
}
