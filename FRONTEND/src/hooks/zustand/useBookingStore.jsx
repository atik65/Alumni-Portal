import { create } from "zustand";

export const useBookingStore = create((set) => ({
  isReturnJourney: false,
  tripInfo: {
    forwardJourney: {
      from: "",
      to: "",
      date: "",
      time: {
        hours: "5",
        minutes: "30",
        amPm: "AM",
      },
      flightNumber: "",
      airportTerminal: "",
      additionalStoppage: {
        isAdditionalStoppage: false,
        stoppage: "",
      },
      geometry: {
        from: {
          lat: 0,
          lng: 0,
        },
        to: {
          lat: 0,
          lng: 0,
        },

        additional: {
          lat: 0,
          lng: 0,
        },
      },
      journeyDistance: 0,
      additionalDistance: 0,
    },
    returnJourney: {
      from: "",
      to: "",
      date: "",
      time: {
        hours: "5",
        minutes: "30",
        amPm: "AM",
      },
      flightNumber: "",
      airportTerminal: "",
      additionalStoppage: {
        isAdditionalStoppage: false,
        stoppage: "",
      },
      geometry: {
        from: {
          lat: 0,
          lng: 0,
        },
        to: {
          lat: 0,
          lng: 0,
        },

        additional: {
          lat: 0,
          lng: 0,
        },
      },
      journeyDistance: 0,
      additionalDistance: 0,
    },
  },

  passengerInfo: {
    isSameSettingForReturnJourney: true,
    showEventType: true,
    eventType: "",

    forwardJourney: {
      isCheckInLuggage: false,
      isBabyOrBoosterSeats: false,

      numberOfPassengers: "1-4",
      selectedCarType: "Premium",
      selectedVehicle: 2,
      numberOfCabinLuggage: "0",
      numberOfCheckInLuggage: "0",
      numberOfBabySeats: "0",
      numberOfBoosterSeats: "0",
      extra8passenger: 8,
    },
    returnJourney: {
      isCheckInLuggage: false,
      isBabyOrBoosterSeats: false,

      numberOfPassengers: "1-4",
      selectedCarType: "Premium",
      selectedVehicle: 2,
      numberOfCabinLuggage: "0",
      numberOfCheckInLuggage: "0",
      numberOfBabySeats: "0",
      numberOfBoosterSeats: "0",
      extra8passenger: 8,
    },
  },

  confirmInfo: {
    fullName: "",
    email: "",
    phone: "",
    note: "",
    isOtpSent: false,
    otp: "",

    isOtpVerified: false,
    createAccount: false,
  },

  addOnInfo: [],
  dateDiscount: {
    forwardJourney: {},
    returnJourney: {},
  },

  forwardJourneyEvent: 0,
  returnJourneyEvent: 0,

  suburbInfo: {
    forwardJourney: {
      from: {},
      to: {},
    },

    returnJourney: {
      from: {},
      to: {},
    },
  },

  // set event id
  setJourneyEvent: (id, journeyType) =>
    set((state) => {
      if (journeyType === "forward") {
        return {
          ...state,
          forwardJourneyEvent: id,
        };
      } else {
        return {
          ...state,
          returnJourneyEvent: id,
        };
      }
    }),

  //   set add ons info
  setAddOnInfo: (addOnInfo) =>
    set((state) => {
      return {
        ...state,
        addOnInfo: addOnInfo,
      };
    }),

  // set date discount
  setDateDiscount: (dateDiscount, journeyType) =>
    set((state) => {
      if (journeyType === "forward") {
        return {
          ...state,
          dateDiscount: {
            ...state.dateDiscount,
            forwardJourney: dateDiscount,
          },
        };
      } else if (journeyType === "return") {
        return {
          ...state,
          dateDiscount: {
            ...state.dateDiscount,
            returnJourney: dateDiscount,
          },
        };
      }
    }),

  // set suburb info

  setSuburbInfo: (suburbInfo, journeyType, suburbFor) =>
    set((state) => {
      if (journeyType === "forward") {
        if (suburbFor === "from") {
          return {
            ...state,
            suburbInfo: {
              ...state.suburbInfo,
              forwardJourney: {
                ...state.suburbInfo.forwardJourney,
                from: suburbInfo,
              },
            },
          };
        } else if (suburbFor === "to") {
          return {
            ...state,
            suburbInfo: {
              ...state.suburbInfo,
              forwardJourney: {
                ...state.suburbInfo.forwardJourney,
                to: suburbInfo,
              },
            },
          };
        }
      } else if (journeyType === "return") {
        if (suburbFor === "from") {
          return {
            ...state,
            suburbInfo: {
              ...state.suburbInfo,
              returnJourney: {
                ...state.suburbInfo.returnJourney,
                from: suburbInfo,
              },
            },
          };
        } else if (suburbFor === "to") {
          return {
            ...state,
            suburbInfo: {
              ...state.suburbInfo,
              returnJourney: {
                ...state.suburbInfo.returnJourney,
                to: suburbInfo,
              },
            },
          };
        }
      }
    }),

  // set is return journey
  setIsReturnJourney: (isReturnJourney) =>
    set((state) => {
      // if is return journey is false -- reset return journey info for trip info and passenger info

      if (!isReturnJourney) {
        return {
          ...state,
          isReturnJourney,
          tripInfo: {
            ...state.tripInfo,
            returnJourney: {
              from: "",
              to: "",
              date: "",
              time: {
                hours: "5",
                minutes: "30",
                amPm: "AM",
              },
              flightNumber: "",
              airportTerminal: "",
              additionalStoppage: {
                isAdditionalStoppage: false,
                stoppage: "",
              },
              geometry: {
                from: {
                  lat: 0,
                  lng: 0,
                },
                to: {
                  lat: 0,
                  lng: 0,
                },
                additional: {
                  lat: 0,
                  lng: 0,
                },
              },
              journeyDistance: 0,
              additionalDistance: 0,
            },
          },
          passengerInfo: {
            ...state.passengerInfo,
            returnJourney: {
              isCheckInLuggage: false,
              isBabyOrBoosterSeats: false,

              numberOfPassengers: "1-4",
              selectedCarType: "Premium",
              selectedVehicle: 2,
              numberOfCabinLuggage: "0",
              numberOfCheckInLuggage: "0",
              numberOfBabySeats: "0",
              numberOfBoosterSeats: "0",
            },
          },
        };
      }

      // if is return journey is true -- just set isReturnJourney to true

      return {
        ...state,
        isReturnJourney,
      };
    }),

  // set from location
  setFromLocation: (fromLocation, journeyType) =>
    set((state) => {
      if (journeyType === "forward") {
        return {
          ...state,
          tripInfo: {
            ...state.tripInfo,
            forwardJourney: {
              ...state.tripInfo.forwardJourney,
              from: fromLocation,
            },
          },
        };
      } else if (journeyType === "return") {
        return {
          ...state,
          tripInfo: {
            ...state.tripInfo,
            returnJourney: {
              ...state.tripInfo.returnJourney,
              from: fromLocation,
            },
          },
        };
      }
    }),

  // set otp
  setOtp: (otp) =>
    set((state) => {
      return {
        ...state,
        confirmInfo: {
          ...state.confirmInfo,
          otp,
        },
      };
    }),

  // set is otp verified
  setIsOtpVerified: (isOtpVerified) =>
    set((state) => {
      return {
        ...state,
        confirmInfo: {
          ...state.confirmInfo,
          isOtpVerified,
        },
      };
    }),

  // set create account
  setCreateAccount: (createAccount) =>
    set((state) => {
      return {
        ...state,
        confirmInfo: {
          ...state.confirmInfo,
          createAccount,
        },
      };
    }),

  //   reset all information
  reset: () =>
    set((state) => {
      return {
        isReturnJourney: false,
        tripInfo: {
          forwardJourney: {
            from: "",
            to: "",
            date: "",
            time: {
              hours: "5",
              minutes: "30",
              amPm: "AM",
            },
            flightNumber: "",
            airportTerminal: "",
            additionalStoppage: {
              isAdditionalStoppage: false,
              stoppage: "",
            },
            geometry: {
              from: {
                lat: 0,
                lng: 0,
              },
              to: {
                lat: 0,
                lng: 0,
              },
              additional: {
                lat: 0,
                lng: 0,
              },
            },
            journeyDistance: 0,
            additionalDistance: 0,
          },
          returnJourney: {
            from: "",
            to: "",
            date: "",
            time: {
              hours: "5",
              minutes: "30",
              amPm: "AM",
            },
            flightNumber: "",
            airportTerminal: "",
            additionalStoppage: {
              isAdditionalStoppage: false,
              stoppage: "",
            },
            geometry: {
              from: {
                lat: 0,
                lng: 0,
              },
              to: {
                lat: 0,
                lng: 0,
              },
              additional: {
                lat: 0,
                lng: 0,
              },
            },
            journeyDistance: 0,
            additionalDistance: 0,
          },
        },

        passengerInfo: {
          isSameSettingForReturnJourney: true,
          showEventType: true,
          eventType: "",

          forwardJourney: {
            isCheckInLuggage: false,
            isBabyOrBoosterSeats: false,

            numberOfPassengers: "1-4",
            selectedCarType: "Premium",
            selectedVehicle: 2,
            numberOfCabinLuggage: "0",
            numberOfCheckInLuggage: "0",
            numberOfBabySeats: "0",
            numberOfBoosterSeats: "0",
          },
          returnJourney: {
            isCheckInLuggage: false,
            isBabyOrBoosterSeats: false,
            numberOfPassengers: "1-4",
            selectedVehicle: 2,
            numberOfCabinLuggage: "0",
            numberOfCheckInLuggage: "0",
            numberOfBabySeats: "0",
            numberOfBoosterSeats: "0",
          },
        },

        confirmInfo: {
          fullName: "",
          email: "",
          phone: "",
          note: "",
          isOtpSent: false,
          otp: "",
          isOtpVerified: false,
        },

        addOnInfo: [],
        dateDiscount: {
          forwardJourney: {},
          returnJourney: {},
        },

        suburbInfo: {
          forwardJourney: {
            from: {},
            to: {},
          },

          returnJourney: {
            from: {},
            to: {},
          },
        },
      };
    }),
}));
