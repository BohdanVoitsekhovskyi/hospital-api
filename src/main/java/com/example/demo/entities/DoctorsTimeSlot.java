package com.example.demo.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalTime;

@Getter
@Setter
@Entity
@Table(name = "doctors_time_slots")
public class DoctorsTimeSlot {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "doctors_time_slots_id_gen")
    @SequenceGenerator(name = "doctors_time_slots_id_gen", sequenceName = "doctors_time_slots_slot_id_seq", allocationSize = 1)
    @Column(name = "slot_id", nullable = false)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "doctor_id")
    private Doctor doctor;

    @Column(name = "date")
    private LocalDate date;

    @Column(name = "\"time\"")
    private LocalTime time;

    @Column(name = "is_available")
    private Boolean isAvailable;

}