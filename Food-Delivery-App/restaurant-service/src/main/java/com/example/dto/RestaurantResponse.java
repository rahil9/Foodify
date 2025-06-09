package com.example.dto;

import java.math.BigDecimal;

public class RestaurantResponse {
    private Long id;
    private String name;
    private String category;
    private String address;
    private String location;
    private BigDecimal rating;
    private String description;
    private BigDecimal minOrderAmount;
    private Integer deliveryTime;
    private String image;

    public RestaurantResponse() {
    }

    public RestaurantResponse(Long id, String name, String category, String address, String location, BigDecimal rating,
            String description, BigDecimal minOrderAmount, Integer deliveryTime, String image) {
        this.id = id;
        this.name = name;
        this.category = category;
        this.address = address;
        this.location = location;
        this.rating = rating;
        this.description = description;
        this.minOrderAmount = minOrderAmount;
        this.deliveryTime = deliveryTime;
        this.image = image;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
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

    public BigDecimal getRating() {
        return rating;
    }

    public void setRating(BigDecimal rating) {
        this.rating = rating;
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
}
