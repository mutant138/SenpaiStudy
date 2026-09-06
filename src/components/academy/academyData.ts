export interface AcademyTopic {
  id: string;
  category: "hardware" | "networks" | "memory" | "web" | "os";
  categoryLabel: string;
  title: string;
  shortSummary: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  readTime: string;
  iconName: "Cpu" | "Network" | "Binary" | "Layers" | "Globe" | "Terminal" | "CircuitBoard" | "Server";
  tagline: string;
  keyConcepts: string[];
  deepDive: {
    overview: string;
    sections: {
      heading: string;
      content: string;
      codeOrDiagram?: string;
      tableData?: {
        headers: string[];
        rows: string[][];
      };
    }[];
    takeaways: string[];
  };
}

export const ACADEMY_CATEGORIES = [
  { id: "all", label: "All Vault Modules" },
  { id: "hardware", label: "Hardware & CPU" },
  { id: "networks", label: "Networks & Internet" },
  { id: "memory", label: "Memory & Execution" },
  { id: "web", label: "Web Internals" },
  { id: "os", label: "OS & Systems" },
] as const;

export const ACADEMY_TOPICS: AcademyTopic[] = [
  {
    id: "how-cpus-work",
    category: "hardware",
    categoryLabel: "Hardware & CPU",
    title: "How CPU Processors Work",
    shortSummary:
      "Inside the silicon brain: Fetch-Decode-Execute cycle, registers, ALU, clock cycles, and multi-level caching hierarchy.",
    difficulty: "Beginner",
    readTime: "6 min read",
    iconName: "Cpu",
    tagline: "From Billions of Transistors to Calculations in Nanoseconds",
    keyConcepts: ["Fetch-Decode-Execute", "Registers & ALU", "L1/L2/L3 Cache", "Branch Prediction", "Clock Speed"],
    deepDive: {
      overview:
        "A Central Processing Unit (CPU) is an integrated circuit containing billions of microscopic transistors that act as electronic switches. At its core, a CPU does one thing relentlessly: it retrieves instructions from memory, interprets what they mean, and executes them billions of times every second.",
      sections: [
        {
          heading: "1. The Fetch-Decode-Execute Cycle",
          content:
            "Every single line of code you write in JavaScript, Python, or C++ eventually boils down to machine instructions executed in three continuous steps:\n\n• **Fetch:** The Control Unit reads the memory address stored in the Program Counter (PC) register and fetches the instruction from RAM/Cache into the Instruction Register (IR).\n• **Decode:** The Instruction Decoder analyzes the binary opcode to determine what operation is needed (e.g., ADD, SUB, JUMP, LOAD, STORE) and which operands are involved.\n• **Execute:** The Arithmetic Logic Unit (ALU) performs mathematical arithmetic or logic operations, reads/writes registers, and stores the result back to memory or register.",
          codeOrDiagram: `+-------------------------------------------------------------+
|                      THE CPU CORE                           |
|                                                             |
|   +-------------------+          +----------------------+   |
|   |   Control Unit    | -------> | Instruction Register |   |
|   | (Program Counter) |          +----------------------+   |
|   +-------------------+                     |               |
|             |                               v               |
|             |                    +----------------------+   |
|             |                    | Instruction Decoder  |   |
|             |                    +----------------------+   |
|             v                               |               |
|   +-------------------+                     v               |
|   | General Registers | <------> +----------------------+   |
|   |  (RAX, RBX, etc)  |          | ALU (Math & Logic)   |   |
|   +-------------------+          +----------------------+   |
+-------------------------------------------------------------+
               |                              |
               v                              v
      [ L1 / L2 / L3 Cache ] <=======> [ Main RAM Memory ]`,
        },
        {
          heading: "2. The Memory Latency Pyramid",
          content:
            "CPUs are insanely fast (operating at 3 to 5 GHz, or 0.2–0.3 nanoseconds per cycle), but Main Memory (RAM) is comparatively slow (~100 nanoseconds). To prevent the CPU from idling while waiting for memory, chips utilize tiered SRAM caches.",
          tableData: {
            headers: ["Memory Tier", "Typical Size", "Access Latency", "Human Equivalent Scale"],
            rows: [
              ["CPU Registers", "1 - 2 KB", "0.5 ns (Instant)", "1 heart beat (~1 second)"],
              ["L1 Cache (Per Core)", "32 - 64 KB", "1 - 1.5 ns", "3 seconds (Grab a pen on your desk)"],
              ["L2 Cache (Per Core)", "512 KB - 2 MB", "3 - 5 ns", "10 seconds (Walk to bookshelf)"],
              ["L3 Cache (Shared)", "16 - 96 MB", "10 - 20 ns", "40 seconds (Walk down the hall)"],
              ["Main Memory (RAM)", "16 - 128 GB", "60 - 100 ns", "3 minutes (Walk to a nearby grocery store)"],
              ["NVMe SSD Disk", "512 GB - 4 TB", "50,000 - 100,000 ns", "3 months (Travel around the world)"],
            ],
          },
        },
        {
          heading: "3. Pipelining and Speculative Execution",
          content:
            "Modern processors don't wait for one instruction to completely finish before starting the next. Like an assembly line, instruction pipelining overlaps Fetch, Decode, Execute, and Writeback across multiple pipeline stages.\n\nModern CPUs also feature Branch Predictors that guess which way an `if/else` condition will jump before evaluation finishes. If the guess is correct, execution continues without stalling; if incorrect, the pipeline is flushed.",
        },
      ],
      takeaways: [
        "Everything a computer does runs on the Fetch-Decode-Execute loop at billions of cycles/sec.",
        "CPU caches (L1, L2, L3) are vital to bridge the massive speed gap between ultrafast CPU cores and slower DRAM.",
        "Writing cache-friendly code (sequential memory access vs random pointer jumps) dramatically improves real-world performance.",
      ],
    },
  },
  {
    id: "x86-vs-arm-architecture",
    category: "hardware",
    categoryLabel: "Hardware & CPU",
    title: "x86 vs ARM: The Architecture Showdown",
    shortSummary:
      "CISC vs RISC, silicon budgets, instruction decoding, power efficiency, and why Apple Silicon & modern servers are switching to ARM.",
    difficulty: "Intermediate",
    readTime: "7 min read",
    iconName: "CircuitBoard",
    tagline: "CISC vs RISC: The Battle Shaping Modern Computing",
    keyConcepts: ["CISC vs RISC", "Instruction Decode Complexity", "Power per Watt", "Apple Silicon M-Series", "x86-64 vs ARM64"],
    deepDive: {
      overview:
        "The debate between x86 and ARM is a story of two opposing design philosophies: CISC (Complex Instruction Set Computer) vs RISC (Reduced Instruction Set Computer). For decades, x86 dominated PCs and servers, while ARM powered mobile phones. Today, ARM's efficiency revolution (Apple M-series, Qualcomm Snapdragon X, AWS Graviton) has brought this rivalry to the center of computing.",
      sections: [
        {
          heading: "1. Core Philosophy: CISC vs. RISC",
          content:
            "• **x86 (CISC):** Born in 1978 by Intel. Prioritized rich, variable-length instructions where a single command can perform memory access and arithmetic in one go. Because memory was scarce in the 1970s, making individual instructions do complex work saved program bytes.\n\n• **ARM (RISC):** Designed with fixed-length, simple, atomic instructions. Operations only execute on registers; loading and storing memory requires dedicated instructions (`Load/Store architecture`). This simplifies instruction decoding silicon, saving transistors, heat, and power.",
          tableData: {
            headers: ["Feature / Metric", "x86-64 (Intel / AMD)", "ARM64 (Apple M, Snapdragon, Graviton)"],
            rows: [
              ["Philosophy", "CISC (Complex Instruction Set)", "RISC (Reduced Instruction Set)"],
              ["Instruction Length", "Variable (1 to 15 bytes long)", "Fixed (4 bytes / 32-bit constant)"],
              ["Decoder Complexity", "Heavy & power-hungry silicon decoders", "Lean, ultra-fast parallel decoders"],
              ["Registers", "16 General Purpose Registers (GPRs)", "31 General Purpose Registers (GPRs)"],
              ["Power & Thermal Profile", "Higher wattage, higher TDP under load", "Exceptional performance-per-watt"],
              ["Dominant Domain", "Legacy PCs, Gaming Rigs, Workstations", "Smartphones, Apple Macs, Cloud Servers"],
            ],
          },
        },
        {
          heading: "2. Why Apple Silicon (M1/M2/M3/M4) is So Fast",
          content:
            "Because ARM instructions are always exactly 4 bytes wide, Apple's M-series chips can build massive 8-wide instruction decoders that easily predict and decode 8 instructions per clock cycle simultaneously.\n\nIn contrast, x86 instructions can vary between 1 and 15 bytes in length, meaning an x86 core must inspect previous instruction lengths before knowing where the next instruction begins, placing a physical ceiling on decode width.",
          codeOrDiagram: `x86 Variable-Length Instruction Stream:
[ 3 bytes ][ 15 bytes ][ 1 byte ][ 7 bytes ][ 4 bytes ]
    ↳ Must parse byte-by-byte to find instruction boundaries (Complex)

ARM Fixed-Length (32-bit) Instruction Stream:
[ 4 bytes ][ 4 bytes ][ 4 bytes ][ 4 bytes ][ 4 bytes ]
    ↳ Decoders can slice 8 instructions in parallel simultaneously (Fast)`,
        },
      ],
      takeaways: [
        "x86 focuses on backward compatibility and raw clock speed brute-force.",
        "ARM achieves superior battery life and parallel decode throughput by enforcing fixed-length simplicity.",
        "The future of computing is heterogeneous: ARM is taking over laptops and data centers, while x86 remains dominant in extreme gaming and legacy infrastructure.",
      ],
    },
  },
  {
    id: "how-internet-works",
    category: "networks",
    categoryLabel: "Networks & Internet",
    title: "How the Internet Actually Works",
    shortSummary:
      "What happens when you type a URL: DNS hierarchical resolution, TCP 3-way handshake, TLS 1.3 encryption, and global packet routing.",
    difficulty: "Beginner",
    readTime: "8 min read",
    iconName: "Globe",
    tagline: "From Keypress to Render: The Global Packet Journey",
    keyConcepts: ["DNS Resolution", "TCP 3-Way Handshake", "TLS 1.3 Encryption", "IP Routing & BGP", "HTTP/2 vs HTTP/3"],
    deepDive: {
      overview:
        "The Internet is not a single giant entity, but a global decentralized mesh of interconnected autonomous systems (AS) communicating via standard networking protocols. Every web request travels thousands of miles across undersea fiber cables in a fraction of a second.",
      sections: [
        {
          heading: "1. The 5-Step Request Journey",
          content:
            "When you type `https://studysenpai.com` and press Enter, your computer executes:\n\n1. **DNS Lookup:** Resolves human-readable domain name to an IP address (e.g. `104.21.45.12`).\n2. **TCP Connection:** Establishes a reliable two-way stream using the SYN, SYN-ACK, ACK handshake.\n3. **TLS Encryption Handshake:** Negotiates encryption keys using asymmetric cryptography (ECDH + TLS 1.3).\n4. **HTTP Request:** Sends HTTP GET request with headers and cookies.\n5. **Packet Routing:** Data packets are chopped into 1500-byte MTUs and routed hop-by-hop across routers using BGP and IP.",
          codeOrDiagram: `[ BROWSER ]                                           [ SERVER ]
     |                                                    |
     | ----- 1. DNS Query (What is studysenpai.com?) ----> | [DNS Resolver]
     | <---- 2. DNS Answer (IP: 104.21.45.12) ----------- |
     |                                                    |
     | ----- 3. TCP SYN --------------------------------> |
     | <---- 4. TCP SYN-ACK ----------------------------- |
     | ----- 5. TCP ACK --------------------------------> | [TCP Established]
     |                                                    |
     | ----- 6. TLS 1.3 ClientHello (Keys) --------------> |
     | <---- 7. TLS 1.3 ServerHello + Cert -------------- | [TLS Encrypted]
     |                                                    |
     | ----- 8. HTTP/2 GET / ---------------------------> |
     | <---- 9. HTTP/2 200 OK (HTML/JS/CSS) ------------- | [Page Renders]`,
        },
        {
          heading: "2. The OSI & TCP/IP Network Models",
          content:
            "Network communication is organized into conceptual abstraction layers:",
          tableData: {
            headers: ["Layer", "Protocol Examples", "Primary Function"],
            rows: [
              ["Application (L7)", "HTTP/3, WebSockets, DNS, SSH", "User-facing application payloads & protocols"],
              ["Transport (L4)", "TCP (Reliable stream), UDP (Low-latency)", "Port-to-port connections, packet ordering, flow control"],
              ["Network (L3)", "IPv4, IPv6, ICMP, BGP", "Host-to-host addressing and router path selection"],
              ["Data Link (L2)", "Ethernet, Wi-Fi (802.11)", "Node-to-node MAC address frame delivery on local network"],
              ["Physical (L1)", "Fiber optic pulses, Radio waves, Copper", "Raw binary bits transmitted as electrical or optical signals"],
            ],
          },
        },
      ],
      takeaways: [
        "DNS translates human names into IP addresses through a hierarchical cache tree.",
        "TCP guarantees in-order delivery via acknowledgements; UDP trades reliability for raw speed.",
        "Modern web standards like HTTP/3 use QUIC over UDP to eliminate TCP head-of-line blocking and achieve sub-100ms connection setups.",
      ],
    },
  },
  {
    id: "programming-memory-execution",
    category: "memory",
    categoryLabel: "Memory & Execution",
    title: "Basics of Programming & Memory",
    shortSummary:
      "Stack vs Heap memory allocation, pointers, memory addresses, compiled vs interpreted languages, and how Garbage Collectors work.",
    difficulty: "Intermediate",
    readTime: "6 min read",
    iconName: "Binary",
    tagline: "Stack, Heap, Pointers, and How Code Runs on Silicon",
    keyConcepts: ["Stack vs Heap", "Pointers & Memory Addresses", "Compilation vs Interpretation", "JIT Compilers", "Garbage Collection"],
    deepDive: {
      overview:
        "Every variable, array, object, and function call in your code lives in computer memory (RAM). Understanding how the operating system and language runtimes allocate, track, and clean up memory is what distinguishes engineers from tutorial-followers.",
      sections: [
        {
          heading: "1. Stack Memory vs. Heap Memory",
          content:
            "• **Stack Memory:** Managed directly by CPU architecture in a strict LIFO (Last-In, First-Out) stack. When a function is called, a Stack Frame is pushed containing local variables and return addresses. Allocation is instantaneous (moving the Stack Pointer register). When the function returns, the entire frame is popped automatically.\n\n• **Heap Memory:** Dynamic memory pool used for objects, arrays, and data whose size is variable or outlives the calling function. Requires searching for free memory blocks and tracking pointers. In C/C++/Rust, heap memory is allocated/freed manually (`malloc`/`free`); in JS/Python/Go, it is managed by a Garbage Collector.",
          tableData: {
            headers: ["Property", "Stack Memory", "Heap Memory"],
            rows: [
              ["Allocation Speed", "Blazing fast (moves CPU stack pointer)", "Slower (searches memory allocator heap)"],
              ["Structure", "Strict LIFO (Last-In-First-Out)", "Hierarchical, fragmented free memory pool"],
              ["Size Limits", "Small (Typically 1 - 8 MB per thread)", "Large (Limited only by available RAM)"],
              ["Access Pattern", "High cache locality (stays in L1/L2)", "Random pointer indirection (more cache misses)"],
              ["Lifetime", "Scoped strictly to current function block", "Persistent until explicitly freed or GC collected"],
            ],
          },
        },
        {
          heading: "2. How Code is Executed: Compiled vs Interpreted vs JIT",
          content:
            "• **Ahead-of-Time Compiled (C, C++, Rust, Go):** Source code is compiled directly into native CPU machine instructions (`.exe` or ELF binary) before running. Blazing performance with zero runtime overhead.\n\n• **Interpreted (Python, Ruby):** Source code is parsed into an abstract syntax tree and executed line-by-line by a Virtual Machine runtime.\n\n• **Just-In-Time Compiled (JavaScript V8, Java HotSpot):** Combines both worlds. Code starts in an interpreter for instant startup, while a Profiler monitors frequently executed 'hot functions' and compiles them directly into optimized machine code on the fly.",
        },
      ],
      takeaways: [
        "Stack allocation is fast and automatic; Heap allocation is dynamic and flexible but requires cleanup.",
        "Memory leaks occur when references to unused Heap memory remain active, preventing garbage collectors from reclaiming RAM.",
        "Modern JavaScript engines like V8 achieve native-like speed through JIT (Just-In-Time) machine code optimization.",
      ],
    },
  },
  {
    id: "how-browser-rendering-works",
    category: "web",
    categoryLabel: "Web Internals",
    title: "How Browsers & Rendering Engines Work",
    shortSummary:
      "Critical rendering path: DOM + CSSOM → Render Tree → Layout/Reflow → Paint → GPU Compositing, and the JavaScript Event Loop.",
    difficulty: "Intermediate",
    readTime: "7 min read",
    iconName: "Layers",
    tagline: "From Raw HTML/CSS Bytes to 60 FPS Pixel Rasterization",
    keyConcepts: ["DOM & CSSOM", "Render Tree", "Layout (Reflow)", "Painting & Compositing", "JavaScript Event Loop"],
    deepDive: {
      overview:
        "Web browsers (Chrome's Blink, Safari's WebKit, Firefox's Gecko) are among the most complex software applications ever built. They parse raw byte streams, calculate box model geometry, and orchestrate hardware-accelerated GPU pipelines at 60 to 120 frames per second.",
      sections: [
        {
          heading: "1. The Critical Rendering Path",
          content:
            "To turn HTML into pixels on your screen, the browser executes 5 discrete stages:\n\n1. **DOM Construction:** Raw HTML bytes → Characters → Tokens → Nodes → Document Object Model (DOM Tree).\n2. **CSSOM Construction:** CSS rules are parsed into the CSS Object Model (CSSOM Tree).\n3. **Render Tree:** Combines DOM and CSSOM, ignoring invisible elements (`display: none`).\n4. **Layout (Reflow):** Calculates the exact geometric position, width, and height of every element on the viewport.\n5. **Paint & Composite:** Draws vector boxes, text, shadows, and rasterizes GPU texture layers onto the screen buffer.",
          codeOrDiagram: `[ HTML Bytes ] ===> [ DOM Tree   ] ---\\
                                       +===> [ Render Tree ] ===> [ Layout ] ===> [ Paint ] ===> [ GPU Composite ]
[ CSS Bytes  ] ===> [ CSSOM Tree ] ---/`,
        },
        {
          heading: "2. The JavaScript Event Loop & Microtasks",
          content:
            "JavaScript is single-threaded, but can handle asynchronous I/O without freezing the UI through the Event Loop:\n\n• **Call Stack:** Executes synchronous JavaScript code.\n• **Microtask Queue:** High-priority queue for `Promise.then()`, `async/await`, `queueMicrotask`. Flushed completely before rendering!\n• **Macrotask Queue:** General task queue for `setTimeout`, `setInterval`, network callbacks.\n• **Render Step:** The browser updates layout and paints the screen between task ticks.",
        },
      ],
      takeaways: [
        "Modifying geometric CSS properties (e.g. `width`, `margin`) triggers an expensive Reflow across the DOM tree.",
        "Using GPU-accelerated properties (`transform`, `opacity`) skips Layout and Paint, animating smoothly on the compositor thread at 120 FPS.",
        "Microtasks (Promises) run before the browser repaints; blocking the main thread with heavy synchronous JS drops UI frame rates.",
      ],
    },
  },
  {
    id: "operating-systems-processes-threads",
    category: "os",
    categoryLabel: "OS & Systems",
    title: "Operating Systems: Processes, Threads & Syscalls",
    shortSummary:
      "Kernel space vs user space, process memory isolation, multi-threading, context switching, and system call boundaries.",
    difficulty: "Advanced",
    readTime: "7 min read",
    iconName: "Terminal",
    tagline: "Kernel Mode, Virtual Memory, and Concurrency Under the Hood",
    keyConcepts: ["Kernel vs User Space", "Processes vs Threads", "Virtual Memory & Page Tables", "Context Switching", "System Calls"],
    deepDive: {
      overview:
        "The Operating System kernel (Linux, Windows, macOS/Darwin) is the master coordinator managing hardware resources. It guarantees that malicious or crashing programs cannot bring down the entire physical machine through hardware-enforced CPU protection rings and virtual memory isolation.",
      sections: [
        {
          heading: "1. User Space vs. Kernel Space (CPU Ring 3 vs Ring 0)",
          content:
            "Modern x86 and ARM processors enforce hardware execution rings:\n\n• **Ring 3 (User Space):** Where your applications (VS Code, Chrome, Node.js) run. Applications cannot touch hardware directly (disks, network cards, GPU).\n• **Ring 0 (Kernel Space):** Has unrestricted access to physical hardware and CPU control registers.\n• **System Calls (Syscalls):** When an app wants to read a file, send a network packet, or create a process, it issues a software interrupt / syscall (e.g., `sys_read`, `sys_write`, `fork`), transferring control safely to the kernel.",
        },
        {
          heading: "2. Processes vs. Threads",
          tableData: {
            headers: ["Attribute", "Process", "Thread"],
            rows: [
              ["Memory Space", "Completely isolated virtual address space", "Shares memory space & heap with sibling threads"],
              ["Creation Cost", "Heavy (Allocates new page tables, file descriptors)", "Lightweight (Shares parent process resources)"],
              ["Communication", "Inter-Process Communication (IPC, Sockets, Pipes)", "Direct memory sharing (Mutexes, Atomic variables)"],
              ["Fault Impact", "If one process crashes, others survive safely", "If one thread crashes (Segfault), entire process dies"],
            ],
          },
        },
      ],
      takeaways: [
        "Virtual memory gives every process the illusion of having the entire RAM to itself while preventing memory corruption across apps.",
        "System calls switch CPU privilege from User Mode (Ring 3) to Kernel Mode (Ring 0).",
        "Multi-threading enables concurrency within a shared memory space, requiring locks to prevent race conditions.",
      ],
    },
  },
];
