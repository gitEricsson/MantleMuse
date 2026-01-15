"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useAccount } from "wagmi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    User,
    FileText,
    CheckCircle2,
    ArrowRight,
    ArrowLeft,
    Upload,
    Shield,
    Loader2
} from "lucide-react";

const STEPS = [
    { id: 1, title: "Personal Information", icon: User },
    { id: 2, title: "Document Verification", icon: FileText },
    { id: 3, title: "Verification Complete", icon: CheckCircle2 },
];

export default function KYCPage() {
    const router = useRouter();
    const { address, isConnected } = useAccount();
    const [currentStep, setCurrentStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        country: "",
        dateOfBirth: "",
        documentType: "passport",
        documentNumber: "",
    });

    const handleChange = (field: string, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleNext = () => {
        if (currentStep < 3) {
            if (currentStep === 2) {
                setIsSubmitting(true);
                // Simulate verification
                setTimeout(() => {
                    setIsSubmitting(false);
                    setCurrentStep(3);
                    // Store verification status
                    if (address) {
                        localStorage.setItem(`kyc_verified_${address}`, "true");
                        localStorage.setItem(`kyc_name_${address}`, formData.fullName);
                    }
                }, 2000);
            } else {
                setCurrentStep(currentStep + 1);
            }
        }
    };

    const handleBack = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    const isStep1Valid = formData.fullName && formData.email && formData.country && formData.dateOfBirth;
    const isStep2Valid = formData.documentNumber;

    if (!isConnected) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center px-4">
                <Card className="w-full max-w-md bg-card border-white/10">
                    <CardHeader className="text-center">
                        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                            <Shield className="w-8 h-8 text-primary" />
                        </div>
                        <CardTitle className="text-2xl">Connect Wallet First</CardTitle>
                        <CardDescription>
                            Please connect your wallet to begin the verification process.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button
                            className="w-full bg-primary text-primary-foreground"
                            onClick={() => router.push("/")}
                        >
                            Go Back
                        </Button>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background py-12 px-4">
            <div className="max-w-2xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
                        <Shield className="w-3 h-3 mr-1" />
                        Identity Verification
                    </Badge>
                    <h1 className="text-4xl font-display font-bold mb-3">
                        Verify Your Identity
                    </h1>
                    <p className="text-muted-foreground">
                        Complete KYC to unlock investment capabilities on MantleMuse.
                    </p>
                </div>

                {/* Progress Steps */}
                <div className="flex items-center justify-center mb-12">
                    {STEPS.map((step, index) => {
                        const Icon = step.icon;
                        const isActive = currentStep === step.id;
                        const isCompleted = currentStep > step.id;

                        return (
                            <div key={step.id} className="flex items-center">
                                <div className="flex flex-col items-center">
                                    <div
                                        className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${isCompleted
                                                ? "bg-primary border-primary text-primary-foreground"
                                                : isActive
                                                    ? "border-primary text-primary bg-primary/10"
                                                    : "border-white/20 text-muted-foreground"
                                            }`}
                                    >
                                        {isCompleted ? (
                                            <CheckCircle2 className="w-6 h-6" />
                                        ) : (
                                            <Icon className="w-5 h-5" />
                                        )}
                                    </div>
                                    <span className={`text-xs mt-2 font-medium ${isActive || isCompleted ? "text-white" : "text-muted-foreground"}`}>
                                        {step.title}
                                    </span>
                                </div>
                                {index < STEPS.length - 1 && (
                                    <div
                                        className={`w-16 md:w-24 h-0.5 mx-2 mb-6 transition-colors duration-300 ${currentStep > step.id ? "bg-primary" : "bg-white/10"
                                            }`}
                                    />
                                )}
                            </div>
                        );
                    })}
                </div>

                {/* Step Content */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentStep}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                    >
                        <Card className="bg-card border-white/10">
                            {currentStep === 1 && (
                                <>
                                    <CardHeader>
                                        <CardTitle>Personal Information</CardTitle>
                                        <CardDescription>
                                            Please provide your basic information for verification.
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="fullName">Full Legal Name</Label>
                                                <Input
                                                    id="fullName"
                                                    placeholder="John Doe"
                                                    value={formData.fullName}
                                                    onChange={(e) => handleChange("fullName", e.target.value)}
                                                    className="bg-background/50 border-white/10"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="email">Email Address</Label>
                                                <Input
                                                    id="email"
                                                    type="email"
                                                    placeholder="john@example.com"
                                                    value={formData.email}
                                                    onChange={(e) => handleChange("email", e.target.value)}
                                                    className="bg-background/50 border-white/10"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="country">Country of Residence</Label>
                                                <Input
                                                    id="country"
                                                    placeholder="United States"
                                                    value={formData.country}
                                                    onChange={(e) => handleChange("country", e.target.value)}
                                                    className="bg-background/50 border-white/10"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="dob">Date of Birth</Label>
                                                <Input
                                                    id="dob"
                                                    type="date"
                                                    value={formData.dateOfBirth}
                                                    onChange={(e) => handleChange("dateOfBirth", e.target.value)}
                                                    className="bg-background/50 border-white/10"
                                                />
                                            </div>
                                        </div>

                                        <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                                            <p className="text-sm text-blue-400">
                                                <strong>Privacy Notice:</strong> Your data is encrypted and stored securely.
                                                We comply with GDPR and global data protection standards.
                                            </p>
                                        </div>
                                    </CardContent>
                                </>
                            )}

                            {currentStep === 2 && (
                                <>
                                    <CardHeader>
                                        <CardTitle>Document Verification</CardTitle>
                                        <CardDescription>
                                            Upload a government-issued ID for verification.
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-6">
                                        <div className="space-y-2">
                                            <Label>Document Type</Label>
                                            <div className="grid grid-cols-3 gap-3">
                                                {["passport", "drivers_license", "national_id"].map((type) => (
                                                    <button
                                                        key={type}
                                                        type="button"
                                                        onClick={() => handleChange("documentType", type)}
                                                        className={`p-4 rounded-lg border text-center transition-all ${formData.documentType === type
                                                                ? "border-primary bg-primary/10 text-white"
                                                                : "border-white/10 text-muted-foreground hover:border-white/30"
                                                            }`}
                                                    >
                                                        <span className="text-sm capitalize">
                                                            {type.replace("_", " ")}
                                                        </span>
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="docNumber">Document Number</Label>
                                            <Input
                                                id="docNumber"
                                                placeholder="Enter document number"
                                                value={formData.documentNumber}
                                                onChange={(e) => handleChange("documentNumber", e.target.value)}
                                                className="bg-background/50 border-white/10"
                                            />
                                        </div>

                                        <div className="border-2 border-dashed border-white/10 rounded-xl p-8 text-center hover:border-white/30 transition-colors cursor-pointer">
                                            <Upload className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
                                            <p className="text-sm text-muted-foreground mb-1">
                                                Drag & drop your document here
                                            </p>
                                            <p className="text-xs text-muted-foreground">
                                                or click to browse (PNG, JPG, PDF up to 10MB)
                                            </p>
                                            <Badge className="mt-4 bg-green-500/10 text-green-400 border-green-500/20">
                                                Demo Mode: Upload Simulated
                                            </Badge>
                                        </div>
                                    </CardContent>
                                </>
                            )}

                            {currentStep === 3 && (
                                <>
                                    <CardHeader className="text-center">
                                        <div className="w-20 h-20 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-4">
                                            <CheckCircle2 className="w-10 h-10 text-green-500" />
                                        </div>
                                        <CardTitle className="text-2xl">Verification Complete!</CardTitle>
                                        <CardDescription>
                                            Your identity has been verified. You can now invest in assets on MantleMuse.
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-6">
                                        <div className="bg-card border border-white/10 rounded-lg p-4 space-y-3">
                                            <div className="flex justify-between text-sm">
                                                <span className="text-muted-foreground">Name</span>
                                                <span className="font-medium">{formData.fullName}</span>
                                            </div>
                                            <div className="flex justify-between text-sm">
                                                <span className="text-muted-foreground">Status</span>
                                                <Badge className="bg-green-500/10 text-green-400 border-green-500/20">
                                                    Verified
                                                </Badge>
                                            </div>
                                            <div className="flex justify-between text-sm">
                                                <span className="text-muted-foreground">Wallet</span>
                                                <span className="font-mono text-xs">
                                                    {address?.slice(0, 6)}...{address?.slice(-4)}
                                                </span>
                                            </div>
                                        </div>

                                        <Button
                                            className="w-full bg-primary text-primary-foreground"
                                            size="lg"
                                            onClick={() => router.push("/explore")}
                                        >
                                            Start Investing
                                            <ArrowRight className="w-4 h-4 ml-2" />
                                        </Button>
                                    </CardContent>
                                </>
                            )}

                            {/* Navigation Buttons */}
                            {currentStep < 3 && (
                                <div className="px-6 pb-6 flex justify-between">
                                    <Button
                                        variant="outline"
                                        onClick={handleBack}
                                        disabled={currentStep === 1}
                                        className="border-white/10"
                                    >
                                        <ArrowLeft className="w-4 h-4 mr-2" />
                                        Back
                                    </Button>
                                    <Button
                                        onClick={handleNext}
                                        disabled={
                                            (currentStep === 1 && !isStep1Valid) ||
                                            (currentStep === 2 && !isStep2Valid) ||
                                            isSubmitting
                                        }
                                        className="bg-primary text-primary-foreground"
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                                Verifying...
                                            </>
                                        ) : (
                                            <>
                                                Continue
                                                <ArrowRight className="w-4 h-4 ml-2" />
                                            </>
                                        )}
                                    </Button>
                                </div>
                            )}
                        </Card>
                    </motion.div>
                </AnimatePresence>

                {/* Security Footer */}
                <div className="mt-8 text-center text-sm text-muted-foreground">
                    <Shield className="w-4 h-4 inline-block mr-1" />
                    Secured with bank-grade encryption. Your data is never shared with third parties.
                </div>
            </div>
        </div>
    );
}
