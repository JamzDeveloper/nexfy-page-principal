import { ProfileForm } from "@/components/profile/profile-form"

export default function AgentProfilePage() {
    return (
        <div className="container py-6 space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold tracking-tight">Mi Perfil</h1>
            </div>
            <ProfileForm />
        </div>
    )
}
