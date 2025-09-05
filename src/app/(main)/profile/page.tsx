
"use client";

import { useAuth } from "@/components/auth-provider";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { signOut, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import { Camera, LogOut, User, Star, MapPin } from "lucide-react";
import { useActionState, useEffect } from 'react';
import { updateProfile } from '@/app/actions';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { setDoc, doc } from "firebase/firestore";

function ProfileForm() {
    const { profile, loading } = useAuth();
    const { toast } = useToast();
    
    const [state, formAction, isPending] = useActionState(updateProfile, { error: null });

    useEffect(() => {
        if (state?.error) {
            toast({
                title: "Error",
                description: state.error,
                variant: "destructive",
            });
        }
    }, [state, toast]);

    if (loading) {
        return (
             <Card>
                <CardHeader>
                    <CardTitle>Personal Details</CardTitle>
                    <CardDescription>Update your name and profile picture.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                   <div className="flex items-center space-x-4">
                        <Skeleton className="h-20 w-20 rounded-full" />
                        <div className="space-y-2 flex-grow">
                             <Skeleton className="h-4 w-16" />
                             <Skeleton className="h-10 w-full" />
                        </div>
                    </div>
                </CardContent>
                <CardFooter>
                    <Skeleton className="h-10 w-32" />
                </CardFooter>
            </Card>
        )
    }

    
    return (
        <form action={formAction} key={profile?.displayName ?? 'loading'}>
            <Card>
                <CardHeader>
                    <CardTitle>Personal Details</CardTitle>
                    <CardDescription>Update your name and profile picture.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center space-x-4">
                        <div className="relative">
                            <Avatar className="h-20 w-20">
                                <AvatarImage src={profile?.photoURL} alt={profile?.displayName || ''} />
                                <AvatarFallback>{profile?.displayName?.[0].toUpperCase()}</AvatarFallback>
                            </Avatar>
                            <Button size="icon" variant="outline" className="absolute bottom-0 right-0 h-8 w-8 rounded-full" disabled>
                                <Camera className="h-4 w-4" />
                            </Button>
                        </div>
                        <div className="space-y-2 flex-grow">
                             <Label htmlFor="displayName">Name</Label>
                             <Input id="displayName" name="displayName" defaultValue={profile?.displayName} />
                        </div>
                    </div>
                </CardContent>
                <CardFooter>
                    <Button type="submit" disabled={isPending}>
                        {isPending ? "Saving..." : "Save Changes"}
                    </Button>
                </CardFooter>
            </Card>
        </form>
    )
}


export default function ProfilePage() {
  const { user, loading } = useAuth();
  const { toast } = useToast();

  const handleSignOut = async () => {
    await signOut(auth);
    toast({
      title: "Signed Out",
      description: "You have been successfully signed out.",
    });
  };
  
  const handleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL
      }, { merge: true });
    } catch (error) {
      console.error("Error signing in with Google: ", error);
      toast({
        title: "Sign-in Error",
        description: "Could not sign in with Google. Please try again.",
        variant: "destructive"
      })
    }
  };


  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 md:px-6 md:py-12">
        <div className="max-w-3xl mx-auto space-y-8">
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-48 w-full" />
        </div>
      </div>
    );
  }
  
  if (!user) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center bg-muted/40 p-4">
        <Card className="max-w-md text-center">
            <CardHeader>
                <CardTitle className="font-headline text-2xl">Access Your Profile</CardTitle>
                <CardDescription>Sign in to save your favorite places and manage your trips.</CardDescription>
            </CardHeader>
            <CardContent>
                <User className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <Button onClick={handleSignIn}>Sign in with Google</Button>
            </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 md:px-6 md:py-12">
        <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold font-headline">My Profile</h1>
            <Button variant="outline" onClick={handleSignOut}>
                <LogOut className="mr-2 h-4 w-4" /> Sign Out
            </Button>
        </div>
        
        <div className="max-w-3xl mx-auto space-y-8">
            <ProfileForm />
            
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center"><Star className="mr-2" />Saved Attractions</CardTitle>
                    <CardDescription>Your bookmarked locations for quick planning.</CardDescription>
                </CardHeader>
                <CardContent className="text-center text-muted-foreground p-8">
                    <p>You haven't saved any attractions yet.</p>
                </CardContent>
            </Card>

             <Card>
                <CardHeader>
                    <CardTitle className="flex items-center"><MapPin className="mr-2" />Itinerary Management</CardTitle>
                    <CardDescription>View and manage your generated day-wise plans.</CardDescription>
                </CardHeader>
                <CardContent className="text-center text-muted-foreground p-8">
                    <p>No itineraries created yet.</p>
                </CardContent>
            </Card>
        </div>
    </div>
  );
}
