import {
    AlertTriangle,
    Archive,
    ArrowRight,
    ArrowUpRight,
    Baby,
    BookOpen,
    BookPlus,
    BookUser,
    CalendarCheck,
    CalendarDays,
    Check,
    ChevronLeft,
    ChevronRight,
    CircleUser,
    Copy,
    File,
    FileText,
    Flame,
    HandCoins,
    HelpCircle,
    Home,
    Image,
    ImagePlus,
    Laptop,
    LayoutPanelLeft,
    LineChart,
    Loader2,
    LucideIcon,
    LucideProps,
    MessagesSquare,
    Moon,
    MoreVertical,
    Package,
    Plus,
    Receipt,
    ReceiptText,
    Search,
    Settings,
    SquareUser,
    SunMedium,
    Trash2,
    User,
    Users,
    X,
    CopyCheck,
    ChartColumnBig,
} from "lucide-react";

export type Icon = LucideIcon;

export const Icons = {
    // === Actions & Navigation ===
    add: Plus,
    arrowRight: ArrowRight,
    arrowUpRight: ArrowUpRight,
    check: Check,
    chevronLeft: ChevronLeft,
    chevronRight: ChevronRight,
    close: X,
    copy: Copy,
    dashboard: LayoutPanelLeft,
    ellipsis: MoreVertical,
    search: Search,
    settings: Settings,
    spinner: Loader2,
    trash: Trash2,

    // === UI & Media ===
    bookOpen: BookOpen,
    bookuser: BookUser,
    booking: BookPlus,
    circleuser: CircleUser,
    image: ImagePlus,
    lineChart: LineChart,
    media: Image,
    messages: MessagesSquare,
    page: File,
    post: FileText,

    // === Users & Data ===
    archive: Archive,
    attendance: CopyCheck,
    baby: Baby,
    bill: Receipt,
    billCustomer: ReceiptText,
    chart: ChartColumnBig,
    customer: ({ ...props }: LucideProps) => (
        <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M16 9C16 11.2091 14.2091 13 12 13C9.79086 13 8 11.2091 8 9C8 6.79086 9.79086 5 12 5C14.2091 5 16 6.79086 16 9ZM14 9C14 10.1046 13.1046 11 12 11C10.8954 11 10 10.1046 10 9C10 7.89543 10.8954 7 12 7C13.1046 7 14 7.89543 14 9Z"
                fill="currentColor"
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 1C5.92487 1 1 5.92487 1 12C1 18.0751 5.92487 23 12 23C18.0751 23 23 18.0751 23 12C23 5.92487 18.0751 1 12 1ZM3 12C3 14.0902 3.71255 16.014 4.90798 17.5417C6.55245 15.3889 9.14627 14 12.0645 14C14.9448 14 17.5092 15.3531 19.1565 17.4583C20.313 15.9443 21 14.0524 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12ZM12 21C9.84977 21 7.87565 20.2459 6.32767 18.9878C7.59352 17.1812 9.69106 16 12.0645 16C14.4084 16 16.4833 17.1521 17.7538 18.9209C16.1939 20.2191 14.1881 21 12 21Z"
                fill="currentColor"
            />
        </svg>
    ),
    price: HandCoins,
    schedule: CalendarCheck,
    schedule2: CalendarDays,
    squareUser: SquareUser,
    user: User,
    users: Users,

    // === Theme ===
    moon: Moon,
    sun: SunMedium,
    warning: AlertTriangle,

    // === External Logos ===
    facebook: ({ ...props }: LucideProps) => (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            aria-hidden="true"
            {...props}
        >
            <path
                fill="#555"
                fillRule="evenodd"
                d="M18.8961111,0 L1.10388889,0 C0.494166667,0 0,0.494166667 0,1.10388889 L0,18.8963889 C0,19.5058333 0.494166667,20 1.10388889,20 L10.6825,20 L10.6825,12.255 L8.07611111,12.255 L8.07611111,9.23666667 L10.6825,9.23666667 L10.6825,7.01055556 C10.6825,4.42722222 12.2602778,3.02083333 14.5647222,3.02083333 C15.6686111,3.02083333 16.6172222,3.10277778 16.8938889,3.13972222 L16.8938889,5.83944444 L15.2955556,5.84027778 C14.0422222,5.84027778 13.7997222,6.43583333 13.7997222,7.30972222 L13.7997222,9.23694444 L16.7886111,9.23694444 L16.3994444,12.2552778 L13.7997222,12.2552778 L13.7997222,20 L18.8963889,20 C19.5058333,20 20,19.5058333 20,18.8961111 L20,1.10388889 C20,0.494166667 19.5058333,0 18.8961111,0 Z"
            />
        </svg>
    ),
    gitHub: ({ ...props }: LucideProps) => (
        <svg
            aria-hidden="true"
            viewBox="0 0 496 512"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                fill="currentColor"
                d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3 .3-5.6-1.3-5.6-3.6 ..." />
        </svg>
    ),
    google: ({ ...props }: LucideProps) => (
        <svg
            aria-hidden="true"
            viewBox="0 0 488 512"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                d="M488 261.8C488 403.3 391.1 504 248 504 ... "
                fill="currentColor"
            />
        </svg>
    ),
    twitter: ({ ...props }: LucideProps) => (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            aria-hidden="true"
            {...props}
        >
            <path
                d="M14.258 10.152L23.176 0h-2.113l-7.747..."
                fill="currentColor"
            />
        </svg>
    ),
    logo: ({ ...props }: LucideProps) => (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" {...props}>
            <circle cx="60" cy="60" r="60" fill="#52C3C3" />
            <circle cx="100" cy="100" r="70" fill="#4D6DB4" />
            <circle cx="160" cy="40" r="30" fill="#F36F36" />
            <circle cx="80" cy="150" r="45" fill="#BED645" />
            <circle cx="30" cy="140" r="30" fill="#EC4097" />
        </svg>
    ),

    // === Custom Icon ===
    line: ({ ...props }: LucideProps) => (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            aria-hidden="true"
            {...props}
        >
            <path
                d="m443 231c-2 45-21 76-51 103..."
                fill="#00B900"
            />
            <path
                d="m371 232h-34m34-36h-36v72h36..."
                fill="none"
                stroke="#fff"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="21"
            />
        </svg>
    ),
};
