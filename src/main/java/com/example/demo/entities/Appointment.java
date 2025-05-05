package com.example.demo.entities;

import com.example.demo.models.AppointmentStatus;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "appointments")
public class Appointment {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "appointments_id_gen")
    @SequenceGenerator(name = "appointments_id_gen", sequenceName = "appointments_appointment_id_seq", allocationSize = 1)
    @Column(name = "appointment_id", nullable = false)
    private Integer id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "patient_id")
    private Patient patient;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "timeslot_id")
    private DoctorsTimeSlot timeslot;

    @Enumerated(EnumType.STRING)
    @Column(name = "status",nullable = false)
    private AppointmentStatus status;

}