"use client";

import Image from "next/image";
import { ExternalLink } from "lucide-react";

const partners = [
    {
        name: "Mantle Network",
        logo: "https://avatars.githubusercontent.com/u/108954920?s=200&v=4",
        description: "Layer 2 Infrastructure",
        url: "https://mantle.xyz",
    },
    {
        name: "Pyth Network",
        logo: "https://avatars.githubusercontent.com/u/80202755?s=200&v=4",
        description: "Price Oracles",
        url: "https://pyth.network",
    },
    {
        name: "Artlist",
        logo: "https://images.crunchbase.com/image/upload/c_lpad,h_170,w_170,f_auto,b_white,q_auto:eco,dpr_1/ttrccbexviqmvdfxpblw",
        description: "Music Licensing",
        url: "https://artlist.io",
    },
    {
        name: "Geneva Freeport",
        logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Coat_of_arms_of_Geneva.svg/800px-Coat_of_arms_of_Geneva.svg.png",
        description: "Art Custody",
        url: "https://genevafreep orts.ch",
    },
];

export function PartnersSection() {
    return (
        <section className="py-16 bg-background border-t border-white/5">
            <div className="container mx-auto px-4">
                <div className="text-center mb-10">
                    <p className="text-sm text-muted-foreground uppercase tracking-widest mb-2">
                        Trusted By
                    </p>
                    <h3 className="text-2xl font-display font-bold">Ecosystem Partners</h3>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {partners.map((partner) => (
                        <a
                            key={partner.name}
                            href={partner.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex flex-col items-center p-6 rounded-2xl bg-card/30 border border-white/5 hover:border-white/10 hover:bg-card/50 transition-all"
                        >
                            <div className="w-16 h-16 rounded-xl bg-white/5 flex items-center justify-center mb-4 group-hover:bg-white/10 transition-colors overflow-hidden">
                                <Image
                                    src={partner.logo}
                                    alt={partner.name}
                                    width={40}
                                    height={40}
                                    className="rounded object-contain"
                                    unoptimized
                                />
                            </div>
                            <h4 className="font-semibold text-white mb-1 flex items-center gap-1">
                                {partner.name}
                                <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </h4>
                            <p className="text-xs text-muted-foreground">{partner.description}</p>
                        </a>
                    ))}
                </div>

                <p className="text-center text-xs text-muted-foreground mt-8">
                    Built for integration with leading RWA and DeFi protocols
                </p>
            </div>
        </section>
    );
}
