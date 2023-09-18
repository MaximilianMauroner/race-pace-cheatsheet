import { createSignal, createEffect, Match, Switch, For } from "solid-js";
import { minToTime, constants } from "../constants";

const [open, setOpen] = createSignal(true);

export default function Modal() {
  const [activeTab, setActiveTab] = createSignal("distance");
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
                <div class="border-b border-gray-200 dark:border-gray-700">
                  <ul
                    class="-mb-px flex flex-wrap rounded text-center text-sm font-medium text-white"
                    role="tablist"
                  >
                    <li class="mr-2" role="presentation">
                      <button
                        class={
                          (activeTab() == "speed"
                            ? "border-b-2 border-gray-300 bg-gray-700"
                            : "border-transparent bg-gray-900") +
                          " group inline-flex items-center justify-center rounded-t-lg   p-4 hover:border-gray-300 hover:text-gray-600 dark:hover:text-gray-300 "
                        }
                        onClick={() => setActiveTab("speed")}
                      >
                        <svg
                          stroke="currentColor"
                          fill="currentColor"
                          stroke-width="0"
                          viewBox="0 0 512 512"
                          height="1em"
                          width="1em"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M135.6 38.35l-17 6.17c6.2 16.99 9.1 34.17 2.3 51.32 4.5 4.76 8.9 9.46 13.3 14.06 12.5-24.41 9.2-50.15 1.4-71.55zm-25.8 71.95c-6.8 2.6-12.82 5.9-18.27 9.7 27.17 29.8 50.17 61.6 63.77 92.1 12.7 28.7 17.4 57.3 7.2 81.1l219.8 158.9c27.5-1.4 45.3-8.1 57.5-17.5 12.8-9.8 20.1-22.9 25.4-38.4-2.9-3.2-6.1-6.3-9.6-9.4-25.7 4.5-48.2-.6-66.9-12.4-19.5-12.2-34.8-31.1-47.8-53-24.5-41.3-41-94-57.7-137.5-44.5 4.5-77.1-1.7-102.7-14.2-30.6-15-50.7-38.1-70.7-59.4zm-31.92 21.5c-4.57 4.9-8.65 10.3-12.34 16.1-10.56 16.7-17.8 37-23.99 57.9l105.85 76.5c5.7-17.1 2.3-38.5-8.6-62.9-12.5-27.9-34.6-58.6-60.92-87.6zm238.92 47c-5.2 1-10.2 1.9-15.2 2.7 3.7 9.7 7.4 19.7 11.1 29.8l26 13.1c-6.9-16.1-13.7-31.5-21.9-45.6zm-285.29 42c-2.72 2.9-4.48 5.9-5.39 9-1.23 4-1.07 8.4 1.01 13.8L266 398c21.8 14 41.4 25.6 59.2 35.1zm290.29 15.3c6.9 18.3 14.2 36.4 22.3 53.1l33.2 14.7c-11.2-18.1-19.8-36.1-27.5-53.7zm36.2 78.8c11.7 19.2 25 34.7 40.3 44.3 11 6.9 22.9 10.9 36.8 11.3-14.8-12.4-27.1-25.2-37.6-38.2zm119.8 98.4c-5.9 13.3-14.2 25.8-27 35.6-11.4 8.7-26 15.2-44.7 18.6 17.5 4.9 31.2 6.5 41.6 6.1 14.9-.6 23.4-4.7 28.6-8.8 5.2-4.1 7.2-8.2 8.1-10.2 3.5-7.8 3.2-19.9-2.5-33.3-1.1-2.6-2.5-5.3-4.1-8z"></path>
                        </svg>
                        <span class="ml-1">Speed</span>
                      </button>
                    </li>
                    <li class="mr-2">
                      <button
                        class={
                          (activeTab() == "distance"
                            ? "border-b-2 border-gray-300 bg-gray-700"
                            : "border-transparent bg-gray-900") +
                          " group inline-flex items-center justify-center rounded-t-lg   p-4 hover:border-gray-300 hover:text-gray-600 dark:hover:text-gray-300 "
                        }
                        onClick={() => setActiveTab("distance")}
                      >
                        <svg
                          stroke="currentColor"
                          fill="none"
                          stroke-width="2"
                          viewBox="0 0 24 24"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          height="1em"
                          width="1em"
                          xmlns="http://www.w3.org/2000/svg"
                          data-darkreader-inline-stroke=""
                          style="--darkreader-inline-stroke: currentColor;"
                        >
                          <path
                            stroke="none"
                            d="M0 0h24v24H0z"
                            fill="none"
                            data-darkreader-inline-stroke=""
                            style="--darkreader-inline-stroke: none;"
                          ></path>
                          <path d="M19.875 12c.621 0 1.125 .512 1.125 1.143v5.714c0 .631 -.504 1.143 -1.125 1.143h-15.875a1 1 0 0 1 -1 -1v-5.857c0 -.631 .504 -1.143 1.125 -1.143h15.75z"></path>
                          <path d="M9 12v2"></path>
                          <path d="M6 12v3"></path>
                          <path d="M12 12v3"></path>
                          <path d="M18 12v3"></path>
                          <path d="M15 12v2"></path>
                          <path d="M3 3v4"></path>
                          <path d="M3 5h18"></path>
                          <path d="M21 3v4"></path>
                        </svg>
                        <span class="ml-1">Distance</span>
                      </button>
                    </li>
                  </ul>
                </div>
                <Switch>
                  <Match when={activeTab() === "speed"}>
                    <SpeedCalculator />
                  </Match>
                  <Match when={activeTab() === "distance"}>
                    <DistanceCalculator />
                  </Match>
                </Switch>
              </div>
            </div>
          </dialog>
        </>
      )}
    </>
  );
}

function SpeedCalculator() {
  const speeds = [
    "KPH",
    "MPH",
    "FIVEK",
    "TENK",
    "HALFMARATHON",
    "MARATHON",
  ] as const;
  type speedType = (typeof speeds)[number];
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
      <div class="relative rounded-b-lg bg-white shadow dark:bg-gray-700">
        <div class="flex items-start justify-between border-b p-4 dark:border-gray-600">
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
                onInput={(e) => handleInputChange(+e.target.value, "KPH")}
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
                onInput={(e) => handleInputChange(+e.target.value, "MPH")}
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
              onInput={(e) => handleTimeChange(e.target.value, "FIVEK")}
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
              onInput={(e) => handleTimeChange(e.target.value, "TENK")}
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
              onInput={(e) => handleTimeChange(e.target.value, "HALFMARATHON")}
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
              onInput={(e) => handleTimeChange(e.target.value, "MARATHON")}
              class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              required
            />
          </div>
        </div>
      </div>
    </>
  );
}
type LapType = {
  laps: [{ speed: number; time: string; distance: number }];
};
const lapSubtype = ["speed", "time", "distance"] as const;
type LapSubtype = (typeof lapSubtype)[number];
function DistanceCalculator() {
  const [laps, setLaps] = createSignal<LapType>({
    laps: [{ speed: 0, time: "00:00:00", distance: 0 }],
  });
  const updateLaps = (
    index: number,
    type: LapSubtype,
    value: number | string,
  ) => {
    const start = laps();
    const newLaps = start.laps;
    if (type === "time" || typeof value === "string") {
      newLaps[index]["time"] = value.toString();
    } else {
      newLaps[index][type] = value;
    }
    if (newLaps[index]["time"] != "00:00:00" && newLaps[index]["speed"] !== 0) {
      const [hours, minutes, seconds] = newLaps[index]["time"].split(":");
      const totalMinutes = +hours * 60 + +minutes;
      const distance = (totalMinutes / 60) * newLaps[index]["speed"];

      newLaps[index]["distance"] = distance;
    }
    start.laps = newLaps;

    setLaps({ ...start });
  };
  createEffect(() => {
    console.log("laps", laps());
  });
  const addLap = () => {
    const newLaps = laps();
    newLaps.laps.push({ speed: 0, time: "00:00:00", distance: 0 });
    setLaps({ ...newLaps });
  };
  const removeLap = (index: number) => {
    const newLaps = laps();
    newLaps.laps.splice(index, 1);
    setLaps({ ...newLaps });
  };
  return (
    <>
      <div class="relative rounded-b-lg bg-white shadow dark:bg-gray-700">
        <div class="flex items-start justify-between border-b p-4 dark:border-gray-600">
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
            Calculate the distance
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
          <div class="mb-6 gap-6">
            <For each={laps().laps}>
              {(lap, index) => {
                return (
                  <div class="flex">
                    <div class="flex rounded-md border p-2">
                      <div>
                        <label
                          for="kph"
                          class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Speed
                        </label>
                        <input
                          type="number"
                          min={0}
                          value={lap.speed}
                          onInput={(e) =>
                            updateLaps(index(), "speed", +e.target.value)
                          }
                          class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                          required
                        />
                      </div>
                      <div>
                        <label
                          for="kph"
                          class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Time
                        </label>
                        <input
                          type="time"
                          step="1"
                          min={0}
                          value={lap.time}
                          onInput={(e) =>
                            updateLaps(index(), "time", e.target.value)
                          }
                          class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                          required
                        />
                      </div>
                      <div>
                        <label
                          for="kph"
                          class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Distance
                        </label>
                        <span class="block w-full rounded-lg  bg-gray-50 p-2.5 text-sm text-gray-900  dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:ring-blue-500">
                          {lap.distance} km
                        </span>
                      </div>
                    </div>
                    <div>
                      <button
                        class="ml-2 h-full rounded-md border p-2 text-white"
                        onClick={() => removeLap(index())}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width={1.5}
                          stroke="currentColor"
                          class="h-6 w-6 text-white"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                );
              }}
            </For>
          </div>
          <button
            class="flex gap-2 rounded-md border p-2 text-white"
            onClick={() => addLap()}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width={1.5}
              stroke="currentColor"
              class="h-6 w-6  "
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
            <span>Add Lap</span>
          </button>
        </div>
      </div>
    </>
  );
}
