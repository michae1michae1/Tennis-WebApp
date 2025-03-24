"use client"

import * as React from "react"
import {
  add,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  getDay,
  isEqual,
  isSameDay,
  isSameMonth,
  isToday,
  parse,
  startOfToday,
  startOfWeek,
} from "date-fns"
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  PlusCircleIcon,
  SearchIcon,
} from "lucide-react"
import { useRouter } from "next/navigation"

import { cn } from "@/lib/utils"
import Button from "@/components/ui/Button"
import { Separator } from "@/components/ui/separator"
import { useMediaQuery } from "@/hooks/use-media-query"

interface Event {
  id: number
  name: string
  time: string
  datetime: string
}

interface CalendarData {
  day: Date
  events: Event[]
}

interface FullScreenCalendarProps {
  data: CalendarData[]
  onEventClick?: (event: Event) => void
  onSearch?: (query: string) => void
}

const colStartClasses = [
  "",
  "col-start-2",
  "col-start-3",
  "col-start-4",
  "col-start-5",
  "col-start-6",
  "col-start-7",
]

export function FullScreenCalendar({ data, onEventClick, onSearch }: FullScreenCalendarProps) {
  const router = useRouter()
  const today = startOfToday()
  const [selectedDay, setSelectedDay] = React.useState(today)
  const [currentMonth, setCurrentMonth] = React.useState(
    format(today, "MMM-yyyy"),
  )
  const [searchQuery, setSearchQuery] = React.useState("")
  const [showSearchInput, setShowSearchInput] = React.useState(false)
  const searchInputRef = React.useRef<HTMLInputElement>(null)
  const firstDayCurrentMonth = parse(currentMonth, "MMM-yyyy", new Date())
  const isDesktop = useMediaQuery("(min-width: 768px)")
  
  // Get events for the selected day
  const selectedDayEvents = React.useMemo(() => {
    return data.filter(item => isSameDay(item.day, selectedDay))
      .flatMap(item => item.events);
  }, [data, selectedDay]);

  const days = eachDayOfInterval({
    start: startOfWeek(firstDayCurrentMonth),
    end: endOfWeek(endOfMonth(firstDayCurrentMonth)),
  })

  function previousMonth() {
    const firstDayNextMonth = add(firstDayCurrentMonth, { months: -1 })
    setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"))
  }

  function nextMonth() {
    const firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 })
    setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"))
  }

  function goToToday() {
    setCurrentMonth(format(today, "MMM-yyyy"))
  }
  
  function handleEventClick(event: Event) {
    if (onEventClick) {
      onEventClick(event);
    } else {
      // Default behavior - navigate to tournament detail page
      // The tournament ID is the event ID
      const tournamentId = event.id > 1000 ? event.id - 1000 : event.id > 500 ? event.id - 500 : event.id;
      router.push(`/tournaments/${tournamentId}`);
    }
  }

  function handleSearchClick() {
    if (isDesktop) {
      setShowSearchInput(!showSearchInput);
      if (!showSearchInput && searchInputRef.current) {
        setTimeout(() => {
          searchInputRef.current?.focus();
        }, 100);
      }
    }
  }

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Search for event
      const allEvents = data.flatMap(item => item.events);
      const foundEvent = allEvents.find(event => 
        event.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      
      if (foundEvent) {
        // Find the day containing this event
        const eventDay = data.find(item => 
          item.events.some(event => event.id === foundEvent.id)
        );
        
        if (eventDay) {
          // Navigate to the month containing this event
          setCurrentMonth(format(eventDay.day, "MMM-yyyy"));
          
          // Select that day
          setSelectedDay(eventDay.day);
          
          // Callback for parent component
          if (onSearch) {
            onSearch(searchQuery);
          }
        }
      }
      
      // Clear search query after search
      if (!isDesktop) {
        setSearchQuery("");
      }
    }
  }

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      {/* Calendar Header */}
      <div className="flex flex-col space-y-4 p-4 md:flex-row md:items-center md:justify-between md:space-y-0 lg:flex-none">
        <div className="flex flex-auto">
          <div className="flex items-center gap-4">
            <div className="hidden w-20 flex-col items-center justify-center rounded-lg border bg-muted p-0.5 md:flex">
              <h1 className="p-1 text-xs uppercase text-muted-foreground">
                {format(today, "MMM")}
              </h1>
              <div className="flex w-full items-center justify-center rounded-lg border bg-background p-0.5 text-lg font-bold">
                <span>{format(today, "d")}</span>
              </div>
            </div>
            <div className="flex flex-col">
              <h2 className="text-lg font-semibold text-foreground">
                {format(firstDayCurrentMonth, "MMMM, yyyy")}
              </h2>
              <p className="text-sm text-muted-foreground">
                {format(firstDayCurrentMonth, "MMM d, yyyy")} -{" "}
                {format(endOfMonth(firstDayCurrentMonth), "MMM d, yyyy")}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center gap-4 md:flex-row md:gap-6">
          {!isDesktop && (
            <form onSubmit={handleSearch} className="relative w-full">
              <input
                type="text"
                placeholder="Search events..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-9 p-2 pl-8 text-sm border rounded-lg"
              />
              <SearchIcon className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Button 
                type="submit" 
                variant="primary" 
                size="sm" 
                className="absolute right-0.5 top-0.5 h-8"
              >
                Find
              </Button>
            </form>
          )}

          {isDesktop && (
            <>
              {showSearchInput ? (
                <form onSubmit={handleSearch} className="flex items-center">
                  <div className="relative">
                    <input
                      ref={searchInputRef}
                      type="text"
                      placeholder="Search events..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-48 h-9 p-2 pl-8 text-sm border rounded-lg"
                    />
                    <SearchIcon className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  </div>
                  <Button 
                    type="submit" 
                    variant="primary" 
                    size="sm" 
                    className="ml-2 h-9"
                  >
                    Find
                  </Button>
                </form>
              ) : (
                <Button variant="outline" size="sm" className="hidden lg:flex" onClick={handleSearchClick}>
                  <SearchIcon size={16} strokeWidth={2} aria-hidden="true" />
                </Button>
              )}
              <Separator orientation="vertical" className="hidden h-6 lg:block" />
            </>
          )}

          <div className="inline-flex items-center w-full md:w-auto">
            <div className="inline-flex -space-x-px rounded-lg shadow-sm shadow-black/5 rtl:space-x-reverse">
              <Button
                onClick={previousMonth}
                className="rounded-none shadow-none first:rounded-s-lg last:rounded-e-lg focus-visible:z-10 h-9"
                variant="outline"
                size="sm"
                aria-label="Navigate to previous month"
              >
                <ChevronLeftIcon size={16} strokeWidth={2} aria-hidden="true" />
              </Button>
              <Button
                onClick={goToToday}
                className="w-full rounded-none shadow-none first:rounded-s-lg last:rounded-e-lg focus-visible:z-10 md:w-auto h-9"
                variant="outline"
                size="sm"
              >
                Today
              </Button>
              <Button
                onClick={nextMonth}
                className="rounded-none shadow-none first:rounded-s-lg last:rounded-e-lg focus-visible:z-10 h-9"
                variant="outline"
                size="sm"
                aria-label="Navigate to next month"
              >
                <ChevronRightIcon size={16} strokeWidth={2} aria-hidden="true" />
              </Button>
            </div>

            <Separator orientation="vertical" className="hidden h-6 mx-4 md:block" />
            <Separator
              orientation="horizontal"
              className="block w-full my-4 md:hidden"
            />

            <Button 
              className="flex items-center h-9 gap-1 md:w-auto"
              variant="primary"
              size="sm"
            >
              <PlusCircleIcon size={16} strokeWidth={2} aria-hidden="true" />
              <span>New Event</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Selected day events - displayed on mobile */}
      {selectedDayEvents.length > 0 && !isDesktop && (
        <div className="border-t border-b bg-muted/50 p-3 md:hidden">
          <h3 className="mb-2 font-medium">
            Events for {format(selectedDay, "MMMM d, yyyy")}
          </h3>
          <div className="space-y-2">
            {selectedDayEvents.map((event) => (
              <div 
                key={event.id} 
                className="rounded-md border bg-secondary/10 p-2 shadow-sm cursor-pointer hover:bg-secondary/20 transition-colors"
                onClick={() => handleEventClick(event)}
              >
                <p className="font-medium">{event.name}</p>
                <p className="text-xs text-muted-foreground">{event.time}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Calendar Grid */}
      <div className="lg:flex lg:flex-auto lg:flex-col">
        {/* Week Days Header */}
        <div className="grid grid-cols-7 border text-center text-xs font-semibold leading-6 lg:flex-none">
          <div className="border-r py-2.5">Sun</div>
          <div className="border-r py-2.5">Mon</div>
          <div className="border-r py-2.5">Tue</div>
          <div className="border-r py-2.5">Wed</div>
          <div className="border-r py-2.5">Thu</div>
          <div className="border-r py-2.5">Fri</div>
          <div className="py-2.5">Sat</div>
        </div>

        {/* Calendar Days */}
        <div className="flex text-xs leading-6 lg:flex-auto">
          <div className="hidden w-full border-x lg:grid lg:grid-cols-7 lg:grid-rows-5">
            {days.map((day, dayIdx) =>
              !isDesktop ? (
                <button
                  onClick={() => setSelectedDay(day)}
                  key={dayIdx}
                  type="button"
                  className={cn(
                    isEqual(day, selectedDay) && "text-white",
                    !isEqual(day, selectedDay) &&
                      !isToday(day) &&
                      isSameMonth(day, firstDayCurrentMonth) &&
                      "text-foreground",
                    !isEqual(day, selectedDay) &&
                      !isToday(day) &&
                      !isSameMonth(day, firstDayCurrentMonth) &&
                      "text-muted-foreground",
                    (isEqual(day, selectedDay) || isToday(day)) &&
                      "font-semibold",
                    "flex h-14 flex-col border-b border-r px-3 py-2 hover:bg-muted focus:z-10",
                  )}
                >
                  <time
                    dateTime={format(day, "yyyy-MM-dd")}
                    className={cn(
                      "ml-auto flex size-6 items-center justify-center rounded-full",
                      isEqual(day, selectedDay) &&
                        isToday(day) &&
                        "bg-primary/80 text-white",
                      isEqual(day, selectedDay) &&
                        !isToday(day) &&
                        "bg-primary/80 text-white",
                      isToday(day) && !isEqual(day, selectedDay) &&
                        "bg-secondary/20 text-primary font-bold",
                    )}
                  >
                    {format(day, "d")}
                  </time>
                  {data.filter((date) => isSameDay(date.day, day)).length >
                    0 && (
                    <div>
                      {data
                        .filter((date) => isSameDay(date.day, day))
                        .map((date) => (
                          <div
                            key={date.day.toString()}
                            className="-mx-0.5 mt-auto flex flex-wrap-reverse"
                          >
                            {date.events.map((event) => (
                              <span
                                key={event.id}
                                className="mx-0.5 mt-1 h-1.5 w-1.5 rounded-full bg-muted-foreground"
                              />
                            ))}
                          </div>
                        ))}
                    </div>
                  )}
                </button>
              ) : (
                <div
                  key={dayIdx}
                  onClick={() => setSelectedDay(day)}
                  className={cn(
                    dayIdx === 0 && colStartClasses[getDay(day)],
                    !isEqual(day, selectedDay) &&
                      !isToday(day) &&
                      !isSameMonth(day, firstDayCurrentMonth) &&
                      "bg-primary/10 text-muted-foreground",
                    "relative flex flex-col border-b border-r hover:bg-secondary/10 focus:z-10",
                    !isEqual(day, selectedDay) && "hover:bg-secondary/10",
                  )}
                >
                  <header className="flex items-center justify-between p-2.5">
                    <button
                      type="button"
                      className={cn(
                        isEqual(day, selectedDay) && "text-white",
                        !isEqual(day, selectedDay) &&
                          !isToday(day) &&
                          isSameMonth(day, firstDayCurrentMonth) &&
                          "text-foreground",
                        !isEqual(day, selectedDay) &&
                          !isToday(day) &&
                          !isSameMonth(day, firstDayCurrentMonth) &&
                          "text-muted-foreground",
                        isEqual(day, selectedDay) &&
                          isToday(day) &&
                          "border-none bg-primary/80",
                        isEqual(day, selectedDay) &&
                          !isToday(day) &&
                          "bg-primary/80 text-white",
                        isToday(day) && !isEqual(day, selectedDay) &&
                          "border border-primary/70 text-primary bg-secondary/10",
                        (isEqual(day, selectedDay) || isToday(day)) &&
                          "font-semibold",
                        "flex h-7 w-7 items-center justify-center rounded-full text-xs hover:border",
                      )}
                    >
                      <time dateTime={format(day, "yyyy-MM-dd")}>
                        {format(day, "d")}
                      </time>
                    </button>
                  </header>
                  <div className="flex-1 p-2.5">
                    {data
                      .filter((event) => isSameDay(event.day, day))
                      .map((day) => (
                        <div key={day.day.toString()} className="space-y-1.5">
                          {day.events.slice(0, 1).map((event) => (
                            <div
                              key={event.id}
                              className="flex flex-col items-start gap-1 rounded-lg border bg-secondary/10 p-2 text-xs leading-tight hover:bg-secondary/20 cursor-pointer transition-colors"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleEventClick(event);
                              }}
                            >
                              <p className="font-medium leading-none">
                                {event.name}
                              </p>
                              <p className="leading-none text-muted-foreground">
                                {event.time}
                              </p>
                            </div>
                          ))}
                          {day.events.length > 1 && (
                            <div className="text-xs text-muted-foreground">
                              + {day.events.length - 1} more
                            </div>
                          )}
                        </div>
                      ))}
                  </div>
                </div>
              ),
            )}
          </div>

          <div className="isolate grid w-full grid-cols-7 grid-rows-5 border-x lg:hidden">
            {days.map((day, dayIdx) => (
              <button
                onClick={() => setSelectedDay(day)}
                key={dayIdx}
                type="button"
                className={cn(
                  isEqual(day, selectedDay) && "text-white",
                  !isEqual(day, selectedDay) &&
                    !isToday(day) &&
                    isSameMonth(day, firstDayCurrentMonth) &&
                    "text-foreground",
                  !isEqual(day, selectedDay) &&
                    !isToday(day) &&
                    !isSameMonth(day, firstDayCurrentMonth) &&
                    "text-muted-foreground",
                  (isEqual(day, selectedDay) || isToday(day)) &&
                    "font-semibold",
                  "flex h-14 flex-col border-b border-r px-3 py-2 hover:bg-muted focus:z-10",
                )}
              >
                <time
                  dateTime={format(day, "yyyy-MM-dd")}
                  className={cn(
                    "ml-auto flex size-6 items-center justify-center rounded-full",
                    isEqual(day, selectedDay) &&
                      isToday(day) &&
                      "bg-primary/80 text-white",
                    isEqual(day, selectedDay) &&
                      !isToday(day) &&
                      "bg-primary/80 text-white",
                    isToday(day) && !isEqual(day, selectedDay) &&
                      "bg-secondary/20 text-primary font-bold",
                  )}
                >
                  {format(day, "d")}
                </time>
                {data.filter((date) => isSameDay(date.day, day)).length > 0 && (
                  <div>
                    {data
                      .filter((date) => isSameDay(date.day, day))
                      .map((date) => (
                        <div
                          key={date.day.toString()}
                          className="-mx-0.5 mt-auto flex flex-wrap-reverse"
                        >
                          {date.events.map((event) => (
                            <span
                              key={event.id}
                              className="mx-0.5 mt-1 h-1.5 w-1.5 rounded-full bg-muted-foreground"
                            />
                          ))}
                        </div>
                      ))}
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
} 