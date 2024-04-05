"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { TimePickerInput } from "@/components/ui/time-picker-input";
import { createClient } from "@/server/supabase/client";
import { type User } from "@supabase/supabase-js";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { createWarehouse } from "./actions";

export default function AddWarehousePage() {
  const [userMod, setUserMod] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [warehouseUserLocation, setWarehouseUserLocation] = useState(false);
  const [warehouseName, setWarehouseName] = useState("");

  const [moderator, setModerator] = useState<{
    name: string;
    email: string;
    phone: string;
  }>({
    name: "",
    email: "",
    phone: "",
  });

  const [warehouseAddress, setWarehouseAddress] = useState({
    address_line_1: "",
    address_line_2: "",
    city: "",
    state: "",
    country: "",
    zip: "",
  });

  const [userHadAddress, setUserHadAddress] = useState(false);

  const [warehouseOpeningHours, setWarehouseOpeningHours] = useState({
    monday: {
      open: new Date(new Date().setHours(9, 0, 0, 0)),
      close: new Date(new Date().setHours(21, 0, 0, 0)),
    },
    tuesday: {
      open: new Date(new Date().setHours(9, 0, 0, 0)),
      close: new Date(new Date().setHours(21, 0, 0, 0)),
    },
    wednesday: {
      open: new Date(new Date().setHours(9, 0, 0, 0)),
      close: new Date(new Date().setHours(21, 0, 0, 0)),
    },
    thursday: {
      open: new Date(new Date().setHours(9, 0, 0, 0)),
      close: new Date(new Date().setHours(21, 0, 0, 0)),
    },
    friday: {
      open: new Date(new Date().setHours(9, 0, 0, 0)),
      close: new Date(new Date().setHours(21, 0, 0, 0)),
    },
    saturday: {
      open: new Date(new Date().setHours(9, 0, 0, 0)),
      close: new Date(new Date().setHours(21, 0, 0, 0)),
    },
    sunday: {
      open: new Date(new Date().setHours(9, 0, 0, 0)),
      close: new Date(new Date().setHours(21, 0, 0, 0)),
    },
  });

  useEffect(() => {
    const supabase = createClient();

    supabase.auth
      .getUser()
      .then((data) => {
        if (!data.data.user) {
          redirect("/login");
        } else {
          setUser(data.data.user);
        }
      })
      .catch((error) => {
        console.error("Error getting user", error);
      });
  }, []);

  useEffect(() => {
    if (user) {
      if (
        !user.user_metadata?.address_line_1 ||
        !user.user_metadata?.city ||
        !user.user_metadata?.state ||
        !user.user_metadata?.country ||
        !user.user_metadata?.zip
      ) {
        setUserHadAddress(false);
      } else {
        setUserHadAddress(true);
      }
    }
  }, [user]);

  return (
    <main className="bg- flex w-full flex-grow flex-col items-center justify-center py-6 ">
      <Card className="flex  w-4/5 flex-row">
        <CardContent className="flex  w-full flex-row items-center p-6">
          <form className="flex  w-full flex-row items-center p-6">
            <section className="flex h-full w-1/2 flex-col items-start justify-start gap-4">
              <h1 className="text-3xl font-bold">Add Warehouse</h1>
              {!userHadAddress ? (
                <p className="text-md font-medium text-yellow-600">
                  Warning: Update you address to set yourself as moderator!
                </p>
              ) : (
                <p className="text-md font-medium text-green-600">
                  Your address is up to date!
                </p>
              )}

              <div className="flex w-full flex-col">
                <p className="text-md font-medium">Warehouse Name</p>
                <Input
                  type="text"
                  name="warehouse_name"
                  onChange={(e) => setWarehouseName(e.target.value)}
                  id="name"
                  value={warehouseName}
                  placeholder="Warehouse Name"
                />
              </div>

              <section className="flex w-full flex-col gap-2">
                <div className="flex w-full flex-row items-center gap-2">
                  <p className="text-md font-medium">
                    Set your location as the warehouse
                  </p>
                  <Input
                    onChange={() => {
                      setWarehouseUserLocation(!warehouseUserLocation);
                      if (!warehouseUserLocation) {
                        setWarehouseAddress({
                          address_line_1: user?.user_metadata
                            ?.address_line_1 as string,
                          address_line_2: user?.user_metadata
                            ?.address_line_2 as string,
                          city: user?.user_metadata?.city as string,
                          state: user?.user_metadata?.state as string,
                          country: user?.user_metadata?.country as string,
                          zip: user?.user_metadata?.zip as string,
                        });
                      } else {
                        setWarehouseAddress({
                          address_line_1: "",
                          address_line_2: "",
                          city: "",
                          state: "",
                          country: "",
                          zip: "",
                        });
                      }
                    }}
                    checked={warehouseUserLocation}
                    className="h-4 w-4"
                    disabled={!userHadAddress}
                    type="checkbox"
                    name="warehouse_user_location"
                    id="warehouse_user_location"
                  />
                </div>
                <section
                  className={
                    "text-md flex w-full flex-col gap-2 rounded-md border border-border p-2 font-medium "
                  }
                >
                  <div className={"flex w-full flex-row gap-4"}>
                    <div className={"flex w-full flex-col "}>
                      Address Line 1
                      <Input
                        type="text"
                        name="address_line_1"
                        id="address_line_1"
                        placeholder="123 Main St."
                        disabled={warehouseUserLocation}
                        onChange={(e) => {
                          setWarehouseAddress({
                            ...warehouseAddress,
                            address_line_1: e.target.value,
                          });
                        }}
                        value={warehouseAddress.address_line_1}
                      />
                    </div>
                    <div className={"flex w-full flex-col"}>
                      Address Line 2
                      <Input
                        type="text"
                        name="address_line_2"
                        id="address_line_2"
                        placeholder="Apt. 123"
                        disabled={warehouseUserLocation}
                        onChange={(e) => {
                          setWarehouseAddress({
                            ...warehouseAddress,
                            address_line_2: e.target.value,
                          });
                        }}
                        value={warehouseAddress.address_line_2}
                      />
                    </div>
                  </div>
                  <div className={"flex w-full flex-row gap-4"}>
                    <div className={"flex w-full flex-col"}>
                      City
                      <Input
                        type="text"
                        name="city"
                        id="city"
                        onChange={(e) => {
                          setWarehouseAddress({
                            ...warehouseAddress,
                            city: e.target.value,
                          });
                        }}
                        placeholder="Melbourne"
                        disabled={warehouseUserLocation}
                        value={warehouseAddress.city}
                      />
                    </div>
                    <div className={"flex w-full flex-col"}>
                      State
                      <Input
                        type="text"
                        name="state"
                        id="state"
                        onChange={(e) => {
                          setWarehouseAddress({
                            ...warehouseAddress,
                            state: e.target.value,
                          });
                        }}
                        placeholder="Victoria"
                        disabled={warehouseUserLocation}
                        value={warehouseAddress.state}
                      />
                    </div>
                    <div className={"flex w-full flex-col"}>
                      Zip
                      <Input
                        type="text"
                        name="zip"
                        id="zip"
                        onChange={(e) => {
                          setWarehouseAddress({
                            ...warehouseAddress,
                            zip: e.target.value,
                          });
                        }}
                        placeholder="3000"
                        value={warehouseAddress.zip}
                        disabled={warehouseUserLocation}
                      />
                    </div>
                  </div>
                  <section
                    className={"text-md flex w-full flex-col font-medium"}
                  >
                    Country
                    <Input
                      type="text"
                      name="country"
                      id="country"
                      placeholder="Australia"
                      onChange={(e) => {
                        setWarehouseAddress({
                          ...warehouseAddress,
                          country: e.target.value,
                        });
                      }}
                      value={warehouseAddress.country}
                      disabled={warehouseUserLocation}
                    />
                  </section>
                </section>
              </section>

              <section className="flex w-full flex-col gap-2">
                <div className="flex w-full flex-row items-center gap-2">
                  <p className="text-md font-medium">
                    Set yourself as moderator
                  </p>
                  <Input
                    onChange={() => {
                      setUserMod(!userMod);
                      if (!userMod) {
                        setModerator({
                          name:
                            user?.user_metadata?.first_name +
                            " " +
                            user?.user_metadata?.last_name,
                          // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
                          email: user?.email!,
                          phone: user?.user_metadata?.phone as string,
                        });
                      } else {
                        setModerator({
                          name: "",
                          email: "",
                          phone: "",
                        });
                      }
                    }}
                    checked={userMod}
                    className="h-4 w-4"
                    type="checkbox"
                    name="user_moderator"
                    id="user_moderator"
                  />
                </div>

                <div className="flex w-full flex-col">
                  <p className="text-md font-medium">Moderator Name</p>
                  <Input
                    type="text"
                    name="moderator_name"
                    id="moderator_name"
                    value={moderator.name}
                    onChange={(e) => {
                      setModerator({
                        ...moderator,
                        name: e.target.value,
                      });
                    }}
                    placeholder="Moderator Name"
                    disabled={userMod}
                  />
                </div>
                <div className="flex w-full flex-col">
                  <p className="text-md font-medium">Moderator Email</p>
                  <Input
                    type="text"
                    name="moderator_email"
                    id="moderator_email"
                    placeholder="Moderator Email"
                    value={moderator.email}
                    onChange={(e) => {
                      setModerator({
                        ...moderator,
                        email: e.target.value,
                      });
                    }}
                    disabled={userMod}
                  />
                </div>
                <div className="flex w-full flex-col">
                  <p className="text-md font-medium">Moderator Phone</p>
                  <Input
                    type="text"
                    name="moderator_phone"
                    id="moderator_phone"
                    value={moderator.phone}
                    onChange={(e) => {
                      setModerator({
                        ...moderator,
                        phone: e.target.value,
                      });
                    }}
                    placeholder="Moderator Phone"
                    disabled={userMod}
                  />
                </div>
              </section>
            </section>
            <Separator orientation={"vertical"} className={"mx-2"} />
            <section className="flex h-full w-1/2 flex-col items-start justify-start gap-4 self-start">
              <h1 className="text-2xl font-bold">
                Opening Hours (24 Hour Format)
              </h1>
              <section className="flex w-full flex-row flex-wrap">
                <div className="text- mt-4  flex w-1/2 flex-col ">
                  <p className={"font-bold text-primary"}>Monday</p>
                  <div
                    className={"flex flex-row items-center justify-start gap-4"}
                  >
                    <div className="flex flex-row items-center gap-2 ">
                      <TimePickerInput
                        picker="hours"
                        date={warehouseOpeningHours.monday.open}
                        setDate={(date) => {
                          if (!date) return;
                          setWarehouseOpeningHours({
                            ...warehouseOpeningHours,
                            monday: {
                              ...warehouseOpeningHours.monday,
                              open: date,
                            },
                          });
                        }}
                      />
                      {":"}
                      <TimePickerInput
                        picker="minutes"
                        date={warehouseOpeningHours.monday.open}
                        setDate={(date) => {
                          if (!date) return;
                          setWarehouseOpeningHours({
                            ...warehouseOpeningHours,
                            monday: {
                              ...warehouseOpeningHours.monday,
                              open: date,
                            },
                          });
                        }}
                      />
                    </div>
                    <p className={"text-md font-bold"}>TO</p>
                    <div className="flex flex-row items-center gap-2 ">
                      <TimePickerInput
                        picker="hours"
                        date={warehouseOpeningHours.monday.close}
                        setDate={(date) => {
                          if (!date) return;
                          setWarehouseOpeningHours({
                            ...warehouseOpeningHours,
                            monday: {
                              ...warehouseOpeningHours.monday,
                              close: date,
                            },
                          });
                        }}
                      />
                      {":"}
                      <TimePickerInput
                        picker="minutes"
                        date={warehouseOpeningHours.monday.close}
                        setDate={(date) => {
                          if (!date) return;
                          setWarehouseOpeningHours({
                            ...warehouseOpeningHours,
                            monday: {
                              ...warehouseOpeningHours.monday,
                              close: date,
                            },
                          });
                        }}
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex  w-1/2 flex-col ">
                  <p className={"font-bold text-primary"}>Tuesday</p>
                  <div
                    className={"flex flex-row items-center justify-start gap-4"}
                  >
                    <div className="flex flex-row items-center gap-2 ">
                      <TimePickerInput
                        picker="hours"
                        date={warehouseOpeningHours.tuesday.open}
                        setDate={(date) => {
                          if (!date) return;
                          setWarehouseOpeningHours({
                            ...warehouseOpeningHours,
                            tuesday: {
                              ...warehouseOpeningHours.tuesday,
                              open: date,
                            },
                          });
                        }}
                      />
                      {":"}
                      <TimePickerInput
                        picker="minutes"
                        date={warehouseOpeningHours.tuesday.open}
                        setDate={(date) => {
                          if (!date) return;
                          setWarehouseOpeningHours({
                            ...warehouseOpeningHours,
                            tuesday: {
                              ...warehouseOpeningHours.tuesday,
                              open: date,
                            },
                          });
                        }}
                      />
                    </div>
                    <p className={"text-md font-bold"}>TO</p>
                    <div className="flex flex-row items-center gap-2 ">
                      <TimePickerInput
                        picker="hours"
                        date={warehouseOpeningHours.tuesday.close}
                        setDate={(date) => {
                          if (!date) return;
                          setWarehouseOpeningHours({
                            ...warehouseOpeningHours,
                            tuesday: {
                              ...warehouseOpeningHours.tuesday,
                              close: date,
                            },
                          });
                        }}
                      />
                      {":"}
                      <TimePickerInput
                        picker="minutes"
                        date={warehouseOpeningHours.tuesday.close}
                        setDate={(date) => {
                          if (!date) return;
                          setWarehouseOpeningHours({
                            ...warehouseOpeningHours,
                            tuesday: {
                              ...warehouseOpeningHours.tuesday,
                              close: date,
                            },
                          });
                        }}
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex  w-1/2 flex-col ">
                  <p className={"font-bold text-primary"}>Wednesday</p>
                  <div
                    className={"flex flex-row items-center justify-start gap-4"}
                  >
                    <div className="flex flex-row items-center gap-2 ">
                      <TimePickerInput
                        picker="hours"
                        date={warehouseOpeningHours.wednesday.open}
                        setDate={(date) => {
                          if (!date) return;
                          setWarehouseOpeningHours({
                            ...warehouseOpeningHours,
                            wednesday: {
                              ...warehouseOpeningHours.wednesday,
                              open: date,
                            },
                          });
                        }}
                      />
                      {":"}
                      <TimePickerInput
                        picker="minutes"
                        date={warehouseOpeningHours.wednesday.open}
                        setDate={(date) => {
                          if (!date) return;
                          setWarehouseOpeningHours({
                            ...warehouseOpeningHours,
                            wednesday: {
                              ...warehouseOpeningHours.wednesday,
                              open: date,
                            },
                          });
                        }}
                      />
                    </div>
                    <p className={"text-md font-bold"}>TO</p>
                    <div className="flex flex-row items-center gap-2 ">
                      <TimePickerInput
                        picker="hours"
                        date={warehouseOpeningHours.wednesday.close}
                        setDate={(date) => {
                          if (!date) return;
                          setWarehouseOpeningHours({
                            ...warehouseOpeningHours,
                            wednesday: {
                              ...warehouseOpeningHours.wednesday,
                              close: date,
                            },
                          });
                        }}
                      />
                      {":"}
                      <TimePickerInput
                        picker="minutes"
                        date={warehouseOpeningHours.wednesday.close}
                        setDate={(date) => {
                          if (!date) return;
                          setWarehouseOpeningHours({
                            ...warehouseOpeningHours,
                            wednesday: {
                              ...warehouseOpeningHours.wednesday,
                              close: date,
                            },
                          });
                        }}
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex  w-1/2 flex-col ">
                  <p className={"font-bold text-primary"}>Thursday</p>
                  <div
                    className={"flex flex-row items-center justify-start gap-4"}
                  >
                    <div className="flex flex-row items-center gap-2 ">
                      <TimePickerInput
                        picker="hours"
                        date={warehouseOpeningHours.thursday.open}
                        setDate={(date) => {
                          if (!date) return;
                          setWarehouseOpeningHours({
                            ...warehouseOpeningHours,
                            thursday: {
                              ...warehouseOpeningHours.thursday,
                              open: date,
                            },
                          });
                        }}
                      />
                      {":"}
                      <TimePickerInput
                        picker="minutes"
                        date={warehouseOpeningHours.thursday.open}
                        setDate={(date) => {
                          if (!date) return;
                          setWarehouseOpeningHours({
                            ...warehouseOpeningHours,
                            thursday: {
                              ...warehouseOpeningHours.thursday,
                              open: date,
                            },
                          });
                        }}
                      />
                    </div>
                    <p className={"text-md font-bold"}>TO</p>
                    <div className="flex flex-row items-center gap-2 ">
                      <TimePickerInput
                        picker="hours"
                        date={warehouseOpeningHours.thursday.close}
                        setDate={(date) => {
                          if (!date) return;
                          setWarehouseOpeningHours({
                            ...warehouseOpeningHours,
                            thursday: {
                              ...warehouseOpeningHours.thursday,
                              close: date,
                            },
                          });
                        }}
                      />
                      {":"}
                      <TimePickerInput
                        picker="minutes"
                        date={warehouseOpeningHours.thursday.close}
                        setDate={(date) => {
                          if (!date) return;
                          setWarehouseOpeningHours({
                            ...warehouseOpeningHours,
                            thursday: {
                              ...warehouseOpeningHours.thursday,
                              close: date,
                            },
                          });
                        }}
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex w-1/2 flex-col ">
                  <p className={"font-bold text-primary"}>Friday</p>
                  <div
                    className={"flex flex-row items-center justify-start gap-4"}
                  >
                    <div className="flex flex-row items-center gap-2 ">
                      <TimePickerInput
                        picker="hours"
                        date={warehouseOpeningHours.friday.open}
                        setDate={(date) => {
                          if (!date) return;
                          setWarehouseOpeningHours({
                            ...warehouseOpeningHours,
                            friday: {
                              ...warehouseOpeningHours.friday,
                              open: date,
                            },
                          });
                        }}
                      />
                      {":"}
                      <TimePickerInput
                        picker="minutes"
                        date={warehouseOpeningHours.friday.open}
                        setDate={(date) => {
                          if (!date) return;
                          setWarehouseOpeningHours({
                            ...warehouseOpeningHours,
                            friday: {
                              ...warehouseOpeningHours.friday,
                              open: date,
                            },
                          });
                        }}
                      />
                    </div>
                    <p className={"text-md font-bold"}>TO</p>
                    <div className="flex flex-row items-center gap-2 ">
                      <TimePickerInput
                        picker="hours"
                        date={warehouseOpeningHours.friday.close}
                        setDate={(date) => {
                          if (!date) return;
                          setWarehouseOpeningHours({
                            ...warehouseOpeningHours,
                            friday: {
                              ...warehouseOpeningHours.friday,
                              close: date,
                            },
                          });
                        }}
                      />
                      {":"}
                      <TimePickerInput
                        picker="minutes"
                        date={warehouseOpeningHours.friday.close}
                        setDate={(date) => {
                          if (!date) return;
                          setWarehouseOpeningHours({
                            ...warehouseOpeningHours,
                            friday: {
                              ...warehouseOpeningHours.friday,
                              close: date,
                            },
                          });
                        }}
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex  w-1/2 flex-col ">
                  <p className={"font-bold text-primary"}>Saturday</p>
                  <div
                    className={"flex flex-row items-center justify-start gap-4"}
                  >
                    <div className="flex flex-row items-center gap-2 ">
                      <TimePickerInput
                        picker="hours"
                        date={warehouseOpeningHours.saturday.open}
                        setDate={(date) => {
                          if (!date) return;
                          setWarehouseOpeningHours({
                            ...warehouseOpeningHours,
                            saturday: {
                              ...warehouseOpeningHours.saturday,
                              open: date,
                            },
                          });
                        }}
                      />
                      {":"}
                      <TimePickerInput
                        picker="minutes"
                        date={warehouseOpeningHours.saturday.open}
                        setDate={(date) => {
                          if (!date) return;
                          setWarehouseOpeningHours({
                            ...warehouseOpeningHours,
                            saturday: {
                              ...warehouseOpeningHours.saturday,
                              open: date,
                            },
                          });
                        }}
                      />
                    </div>
                    <p className={"text-md font-bold"}>TO</p>
                    <div className="flex flex-row items-center gap-2 ">
                      <TimePickerInput
                        picker="hours"
                        date={warehouseOpeningHours.saturday.close}
                        setDate={(date) => {
                          if (!date) return;
                          setWarehouseOpeningHours({
                            ...warehouseOpeningHours,
                            saturday: {
                              ...warehouseOpeningHours.saturday,
                              close: date,
                            },
                          });
                        }}
                      />
                      {":"}
                      <TimePickerInput
                        picker="minutes"
                        date={warehouseOpeningHours.saturday.close}
                        setDate={(date) => {
                          if (!date) return;
                          setWarehouseOpeningHours({
                            ...warehouseOpeningHours,
                            saturday: {
                              ...warehouseOpeningHours.saturday,
                              close: date,
                            },
                          });
                        }}
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-4  flex w-1/2 flex-col ">
                  <p className={"font-bold text-primary"}>Sunday</p>
                  <div
                    className={"flex flex-row items-center justify-start gap-4"}
                  >
                    <div className="flex flex-row items-center gap-2 ">
                      <TimePickerInput
                        picker="hours"
                        date={warehouseOpeningHours.sunday.open}
                        setDate={(date) => {
                          if (!date) return;
                          setWarehouseOpeningHours({
                            ...warehouseOpeningHours,
                            sunday: {
                              ...warehouseOpeningHours.sunday,
                              open: date,
                            },
                          });
                        }}
                      />
                      {":"}
                      <TimePickerInput
                        picker="minutes"
                        date={warehouseOpeningHours.sunday.open}
                        setDate={(date) => {
                          if (!date) return;
                          setWarehouseOpeningHours({
                            ...warehouseOpeningHours,
                            sunday: {
                              ...warehouseOpeningHours.sunday,
                              open: date,
                            },
                          });
                        }}
                      />
                    </div>
                    <p className={"text-md font-bold"}>TO</p>
                    <div className="flex flex-row items-center gap-2 ">
                      <TimePickerInput
                        picker="hours"
                        date={warehouseOpeningHours.sunday.close}
                        setDate={(date) => {
                          if (!date) return;
                          setWarehouseOpeningHours({
                            ...warehouseOpeningHours,
                            sunday: {
                              ...warehouseOpeningHours.sunday,
                              close: date,
                            },
                          });
                        }}
                      />
                      {":"}
                      <TimePickerInput
                        picker="minutes"
                        date={warehouseOpeningHours.sunday.close}
                        setDate={(date) => {
                          if (!date) return;
                          setWarehouseOpeningHours({
                            ...warehouseOpeningHours,
                            sunday: {
                              ...warehouseOpeningHours.sunday,
                              close: date,
                            },
                          });
                        }}
                      />
                    </div>
                  </div>
                </div>
              </section>
              <Button
                onClick={async () => {
                  console.log("Submit");

                  const formData = new FormData();

                  //name
                  formData.append("warehouse_name", warehouseName);

                  //address
                  formData.append(
                    "address_line_1",
                    warehouseAddress.address_line_1,
                  );
                  formData.append(
                    "address_line_2",
                    warehouseAddress.address_line_2,
                  );
                  formData.append("city", warehouseAddress.city);
                  formData.append("state", warehouseAddress.state);
                  formData.append("country", warehouseAddress.country);
                  formData.append("zip", warehouseAddress.zip);

                  //moderator

                  formData.append("moderator_name", moderator.name);
                  formData.append("moderator_email", moderator.email);
                  formData.append("moderator_phone", moderator.phone);

                  //opening hours
                  formData.append(
                    "monday_open",
                    warehouseOpeningHours.monday.open.toString(),
                  );
                  formData.append(
                    "monday_close",
                    warehouseOpeningHours.monday.close.toString(),
                  );

                  formData.append(
                    "tuesday_open",
                    warehouseOpeningHours.tuesday.open.toString(),
                  );
                  formData.append(
                    "tuesday_close",
                    warehouseOpeningHours.tuesday.close.toString(),
                  );

                  formData.append(
                    "wednesday_open",
                    warehouseOpeningHours.wednesday.open.toString(),
                  );
                  formData.append(
                    "wednesday_close",
                    warehouseOpeningHours.wednesday.close.toString(),
                  );

                  formData.append(
                    "thursday_open",
                    warehouseOpeningHours.thursday.open.toString(),
                  );
                  formData.append(
                    "thursday_close",
                    warehouseOpeningHours.thursday.close.toString(),
                  );

                  formData.append(
                    "friday_open",
                    warehouseOpeningHours.friday.open.toString(),
                  );
                  formData.append(
                    "friday_close",
                    warehouseOpeningHours.friday.close.toString(),
                  );

                  formData.append(
                    "saturday_open",
                    warehouseOpeningHours.saturday.open.toString(),
                  );
                  formData.append(
                    "saturday_close",
                    warehouseOpeningHours.saturday.close.toString(),
                  );

                  formData.append(
                    "sunday_open",
                    warehouseOpeningHours.sunday.open.toString(),
                  );
                  formData.append(
                    "sunday_close",
                    warehouseOpeningHours.sunday.close.toString(),
                  );

                  //submit
                  await createWarehouse(formData);

                  redirect("/profile/warehouses");
                }}
                variant="default"
                className="h-full w-full self-end text-lg"
              >
                Add Warehouse
              </Button>
            </section>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
