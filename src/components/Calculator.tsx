import { createSignal } from "solid-js";
import { minToTime, constants } from "../constants";

export default function Calculator() {
  const speeds = [
    "KPH",
    "MPH",
    "FIVEK",
    "TENK",
    "HALFMARATHON",
    "MARATHON",
  ] as const;
  type speedType = (typeof speeds)[number];
  const [open, setOpen] = createSignal(true);
  const [kph, setKph] = createSignal(0);
  const [mph, setMph] = createSignal(0);
  const [fiveK, setFiveK] = createSignal("00:00:00");
  const [tenK, setTenK] = createSignal("00:00:00");
  const [halfMarathon, setHalfMarathon] = createSignal("00:00:00");
  const [fullMarathon, setFullMarathon] = createSignal("00:00:00");

  const handleInputChange = (value: number, type: speedType) => {
    if (isNaN(value) || value == 0) {
      value = 1;
    }
    if (type === "KPH") {
      setKph(value);
      setMph(Math.floor(value * constants.kmInMile * 100) / 100);
    } else {
      setMph(value);
      setKph(Math.floor((value / constants.kmInMile) * 100) / 100);
    }
    const mpk = 60 / kph();
    setFiveK(convertMinToTime(mpk * 5));
    setTenK(convertMinToTime(mpk * 10));
    setHalfMarathon(convertMinToTime(mpk * constants.halfMarathonK));
    setFullMarathon(convertMinToTime(mpk * constants.marathonK));
  };
  const handleTimeChange = (value: string, type: speedType) => {
    const [hours, minutes, seconds] = value.split(":");
    const totalMinutes = +hours * 60 + +minutes;

    let kms = 0;
    switch (type) {
      case "FIVEK":
        kms = 5;
        break;
      case "TENK":
        kms = 10;
        break;
      case "HALFMARATHON":
        kms = constants.halfMarathonK;
        break;
      case "MARATHON":
        kms = constants.marathonK;
        break;
    }

    const kmPerHour = kms / (totalMinutes / 60);
    handleInputChange(kmPerHour, "KPH");
  };

  const convertMinToTime = (value: number) => {
    if (value > 24 * 60) {
      return "23:59:59";
    }
    return minToTime(value);
  };
  return (
    <>
      <button
        onClick={() => setOpen(!open())}
        class="absolute bottom-3 left-3 z-[1000] rounded-full border border-gray-500 bg-green-600 p-2 text-white dark:bg-white dark:text-green-600"
      >
        {open() ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width={1.5}
            stroke="currentColor"
            class="h-10 w-10"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width={1.5}
            stroke="currentColor"
            class="h-10 w-10"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15.75 15.75V18m-7.5-6.75h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25V13.5zm0 2.25h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25V18zm2.498-6.75h.007v.008h-.007v-.008zm0 2.25h.007v.008h-.007V13.5zm0 2.25h.007v.008h-.007v-.008zm0 2.25h.007v.008h-.007V18zm2.504-6.75h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V13.5zm0 2.25h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V18zm2.498-6.75h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V13.5zM8.25 6h7.5v2.25h-7.5V6zM12 2.25c-1.892 0-3.758.11-5.593.322C5.307 2.7 4.5 3.65 4.5 4.757V19.5a2.25 2.25 0 002.25 2.25h10.5a2.25 2.25 0 002.25-2.25V4.757c0-1.108-.806-2.057-1.907-2.185A48.507 48.507 0 0012 2.25z"
            />
          </svg>
        )}
      </button>
      {open() && (
        <>
          <dialog open={open()}>
            <div
              id="popup-modal"
              class="fixed left-0 right-0 top-0 z-50 flex h-[calc(100%-1rem)] max-h-full flex-row overflow-y-auto overflow-x-hidden p-4 md:inset-0"
            >
              <div class="relative m-auto max-h-full w-full max-w-md">
                <div class="relative rounded-lg bg-white shadow dark:bg-gray-700">
                  <div class="flex items-start justify-between rounded-t border-b p-4 dark:border-gray-600">
                    <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                      Calculate the pace
                    </h3>
                    <form method="dialog">
                      <button
                        type="button"
                        onClick={() => setOpen(false)}
                        class="absolute right-2.5 top-3 ml-auto inline-flex h-8 w-8 items-center justify-center rounded-lg bg-transparent text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
                        data-modal-hide="popup-modal"
                      >
                        <svg
                          class="h-3 w-3"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 14 14"
                        >
                          <path
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                          />
                        </svg>
                        <span class="sr-only">Close modal</span>
                      </button>
                    </form>
                  </div>
                  <div class="space-y-6 p-6">
                    <div class="mb-6 grid gap-6 md:grid-cols-2">
                      <div>
                        <label
                          for="kph"
                          class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                        >
                          KM PER HOUR
                        </label>
                        <input
                          type="number"
                          id="kph"
                          min={0}
                          value={kph()}
                          onInput={(e) =>
                            handleInputChange(+e.target.value, "KPH")
                          }
                          class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                          required
                        />
                      </div>
                      <div>
                        <label
                          for="mph"
                          class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                        >
                          MILES PER HOUR
                        </label>
                        <input
                          type="number"
                          id="mph"
                          min={0}
                          value={mph()}
                          onInput={(e) =>
                            handleInputChange(+e.target.value, "MPH")
                          }
                          class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                          required
                        />
                      </div>
                    </div>
                  </div>
                  <div class="flex flex-col rounded-b border-t border-gray-200 p-6 dark:border-gray-600">
                    <div>
                      <label
                        for="fivek"
                        class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                      >
                        5K
                      </label>
                      <input
                        type="time"
                        id="fivek"
                        min={0}
                        value={fiveK()}
                        onInput={(e) =>
                          handleTimeChange(e.target.value, "FIVEK")
                        }
                        class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                        required
                      />
                    </div>
                    <div>
                      <label
                        for="tenk"
                        class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                      >
                        10K
                      </label>
                      <input
                        type="time"
                        id="tenk"
                        min={0}
                        value={tenK()}
                        onInput={(e) =>
                          handleTimeChange(e.target.value, "TENK")
                        }
                        class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                        required
                      />
                    </div>
                    <div>
                      <label
                        for="halfmartahon"
                        class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                      >
                        HALF MARATHON
                      </label>
                      <input
                        type="time"
                        id="halfmartahon"
                        min={0}
                        value={halfMarathon()}
                        onInput={(e) =>
                          handleTimeChange(e.target.value, "HALFMARATHON")
                        }
                        class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                        required
                      />
                    </div>
                    <div>
                      <label
                        for="martahon"
                        class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                      >
                        MARATHON
                      </label>
                      <input
                        type="time"
                        id="martahon"
                        min={0}
                        value={fullMarathon()}
                        onInput={(e) =>
                          handleTimeChange(e.target.value, "MARATHON")
                        }
                        class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </dialog>
        </>
      )}
    </>
  );
}
