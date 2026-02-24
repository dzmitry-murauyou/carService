package com.example.carservice.dto;

public class ServiceDto {
    private String name;
    private String description;
    private Double price;
    private String duration;
    private String category;
    private String status;
    private String masterName;
    private String note;

    public ServiceDto() {
    }

    private ServiceDto(Builder builder) {
        this.name = builder.name;
        this.description = builder.description;
        this.price = builder.price;
        this.duration = builder.duration;
        this.category = builder.category;
        this.status = builder.status;
        this.masterName = builder.masterName;
        this.note = builder.note;
    }

    // Геттеры и сеттеры
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public String getDuration() {
        return duration;
    }

    public void setDuration(String duration) {
        this.duration = duration;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getMasterName() {
        return masterName;
    }

    public void setMasterName(String masterName) {
        this.masterName = masterName;
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }

    // Внутренний класс Builder
    public static class Builder {
        private String name;
        private String description;
        private Double price;
        private String duration;
        private String category;
        private String status;
        private String masterName;
        private String note;

        public Builder name(String name) {
            this.name = name;
            return this;
        }

        public Builder description(String description) {
            this.description = description;
            return this;
        }

        public Builder price(Double price) {
            this.price = price;
            return this;
        }

        public Builder duration(String duration) {
            this.duration = duration;
            return this;
        }

        public Builder category(String category) {
            this.category = category;
            return this;
        }

        public Builder status(String status) {
            this.status = status;
            return this;
        }

        public Builder masterName(String masterName) {
            this.masterName = masterName;
            return this;
        }

        public Builder note(String note) {
            this.note = note;
            return this;
        }

        public ServiceDto build() {
            return new ServiceDto(this);
        }
    }
}