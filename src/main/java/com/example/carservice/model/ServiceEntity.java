package com.example.carservice.model;

public class ServiceEntity {
    private Long id;
    private String name;
    private String description;
    private Double price;
    private Integer durationMinutes;
    private String category;
    private Boolean available;
    private String masterName;
    private String note;

    public ServiceEntity() {
    }

    private ServiceEntity(Builder builder) {
        this.id = builder.id;
        this.name = builder.name;
        this.description = builder.description;
        this.price = builder.price;
        this.durationMinutes = builder.durationMinutes;
        this.category = builder.category;
        this.available = builder.available;
        this.masterName = builder.masterName;
        this.note = builder.note;
    }

    // Геттеры и сеттеры
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

    public Integer getDurationMinutes() {
        return durationMinutes;
    }

    public void setDurationMinutes(Integer durationMinutes) {
        this.durationMinutes = durationMinutes;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public Boolean getAvailable() {
        return available;
    }

    public void setAvailable(Boolean available) {
        this.available = available;
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
        private Long id;
        private String name;
        private String description;
        private Double price;
        private Integer durationMinutes;
        private String category;
        private Boolean available;
        private String masterName;
        private String note;

        public Builder id(Long id) {
            this.id = id;
            return this;
        }

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

        public Builder durationMinutes(Integer durationMinutes) {
            this.durationMinutes = durationMinutes;
            return this;
        }

        public Builder category(String category) {
            this.category = category;
            return this;
        }

        public Builder available(Boolean available) {
            this.available = available;
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

        public ServiceEntity build() {
            return new ServiceEntity(this);
        }
    }
}