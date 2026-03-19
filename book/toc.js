// Populate the sidebar
//
// This is a script, and not included directly in the page, to control the total size of the book.
// The TOC contains an entry for each page, so if each page includes a copy of the TOC,
// the total size of the page becomes O(n**2).
class MDBookSidebarScrollbox extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        this.innerHTML = '<ol class="chapter"><li class="chapter-item expanded "><a href="intro.html"><strong aria-hidden="true">1.</strong> Introduction</a></li><li class="chapter-item expanded affix "><li class="part-title">Week 1 — Foundations</li><li class="chapter-item expanded "><a href="day-01.html"><strong aria-hidden="true">2.</strong> Day 1: What Is a Transistor?</a></li><li class="chapter-item expanded "><a href="day-02.html"><strong aria-hidden="true">3.</strong> Day 2: Silicon Wafers</a></li><li class="chapter-item expanded "><a href="day-03.html"><strong aria-hidden="true">4.</strong> Day 3: Photolithography 101</a></li><li class="chapter-item expanded "><a href="day-04.html"><strong aria-hidden="true">5.</strong> Day 4: Moore&#39;s Law</a></li><li class="chapter-item expanded "><a href="day-05.html"><strong aria-hidden="true">6.</strong> Day 5: Logic Gates to CPUs</a></li><li class="chapter-item expanded "><a href="day-06.html"><strong aria-hidden="true">7.</strong> Day 6: Process Nodes</a></li><li class="chapter-item expanded "><a href="day-07.html"><strong aria-hidden="true">8.</strong> Day 7: The Fab</a></li><li class="chapter-item expanded affix "><li class="part-title">Week 2 — Manufacturing Deep Dive</li><li class="chapter-item expanded "><a href="day-08.html"><strong aria-hidden="true">9.</strong> Day 8: EUV Lithography</a></li><li class="chapter-item expanded "><a href="day-09.html"><strong aria-hidden="true">10.</strong> Day 9: Etching &amp; Deposition</a></li><li class="chapter-item expanded "><a href="day-10.html"><strong aria-hidden="true">11.</strong> Day 10: Doping &amp; Ion Implantation</a></li><li class="chapter-item expanded "><a href="day-11.html"><strong aria-hidden="true">12.</strong> Day 11: Interconnects</a></li><li class="chapter-item expanded "><a href="day-12.html"><strong aria-hidden="true">13.</strong> Day 12: Chemical Mechanical Planarization</a></li><li class="chapter-item expanded "><a href="day-13.html"><strong aria-hidden="true">14.</strong> Day 13: Packaging</a></li><li class="chapter-item expanded "><a href="day-14.html"><strong aria-hidden="true">15.</strong> Day 14: Yield &amp; Defects</a></li><li class="chapter-item expanded affix "><li class="part-title">Week 3 — Design &amp; Architecture</li><li class="chapter-item expanded "><a href="day-15.html"><strong aria-hidden="true">16.</strong> Day 15: RTL to GDSII</a></li><li class="chapter-item expanded "><a href="day-16.html"><strong aria-hidden="true">17.</strong> Day 16: CPU Architecture</a></li><li class="chapter-item expanded "><a href="day-17.html"><strong aria-hidden="true">18.</strong> Day 17: GPU Architecture</a></li><li class="chapter-item expanded "><a href="day-18.html"><strong aria-hidden="true">19.</strong> Day 18: Memory Hierarchy</a></li><li class="chapter-item expanded "><a href="day-19.html"><strong aria-hidden="true">20.</strong> Day 19: AI Accelerators</a></li><li class="chapter-item expanded "><a href="day-20.html"><strong aria-hidden="true">21.</strong> Day 20: RISC-V</a></li><li class="chapter-item expanded "><a href="day-21.html"><strong aria-hidden="true">22.</strong> Day 21: Power &amp; Thermal</a></li><li class="chapter-item expanded affix "><li class="part-title">Week 4 — Industry &amp; Geopolitics</li><li class="chapter-item expanded "><a href="day-22.html"><strong aria-hidden="true">23.</strong> Day 22: TSMC</a></li></ol>';
        // Set the current, active page, and reveal it if it's hidden
        let current_page = document.location.href.toString().split("#")[0];
        if (current_page.endsWith("/")) {
            current_page += "index.html";
        }
        var links = Array.prototype.slice.call(this.querySelectorAll("a"));
        var l = links.length;
        for (var i = 0; i < l; ++i) {
            var link = links[i];
            var href = link.getAttribute("href");
            if (href && !href.startsWith("#") && !/^(?:[a-z+]+:)?\/\//.test(href)) {
                link.href = path_to_root + href;
            }
            // The "index" page is supposed to alias the first chapter in the book.
            if (link.href === current_page || (i === 0 && path_to_root === "" && current_page.endsWith("/index.html"))) {
                link.classList.add("active");
                var parent = link.parentElement;
                if (parent && parent.classList.contains("chapter-item")) {
                    parent.classList.add("expanded");
                }
                while (parent) {
                    if (parent.tagName === "LI" && parent.previousElementSibling) {
                        if (parent.previousElementSibling.classList.contains("chapter-item")) {
                            parent.previousElementSibling.classList.add("expanded");
                        }
                    }
                    parent = parent.parentElement;
                }
            }
        }
        // Track and set sidebar scroll position
        this.addEventListener('click', function(e) {
            if (e.target.tagName === 'A') {
                sessionStorage.setItem('sidebar-scroll', this.scrollTop);
            }
        }, { passive: true });
        var sidebarScrollTop = sessionStorage.getItem('sidebar-scroll');
        sessionStorage.removeItem('sidebar-scroll');
        if (sidebarScrollTop) {
            // preserve sidebar scroll position when navigating via links within sidebar
            this.scrollTop = sidebarScrollTop;
        } else {
            // scroll sidebar to current active section when navigating via "next/previous chapter" buttons
            var activeSection = document.querySelector('#sidebar .active');
            if (activeSection) {
                activeSection.scrollIntoView({ block: 'center' });
            }
        }
        // Toggle buttons
        var sidebarAnchorToggles = document.querySelectorAll('#sidebar a.toggle');
        function toggleSection(ev) {
            ev.currentTarget.parentElement.classList.toggle('expanded');
        }
        Array.from(sidebarAnchorToggles).forEach(function (el) {
            el.addEventListener('click', toggleSection);
        });
    }
}
window.customElements.define("mdbook-sidebar-scrollbox", MDBookSidebarScrollbox);
