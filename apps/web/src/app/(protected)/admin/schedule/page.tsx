'use client'

import { useState } from 'react'
import { Plus, Edit, Trash2, Clock, Users, Calendar } from 'lucide-react'

import { useGetSchedulesQuery, useCreateScheduleMutation, useUpdateScheduleMutation, useDeleteScheduleMutation, useSchedulesSSE, type Schedule, type ScheduleClassName, type ScheduleDay } from '~/lib/hooks/schedule'
import {
    GlassInput,
    GlassContainer,
} from "~/components/ui/liquid-glass"
import GlassModal from '~/components/ui/liquid-glass/glass-modal'
import GlassButton from '~/components/ui/liquid-glass/glass-button'
import GlassCard from '~/components/ui/liquid-glass/glass-card'

export default function SchedulePage() {
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
    const [editingSchedule, setEditingSchedule] = useState<Schedule | null>(null)

    // Queries and mutations
    const { data: schedules, isLoading } = useGetSchedulesQuery()
    const createMutation = useCreateScheduleMutation()
    const updateMutation = useUpdateScheduleMutation()
    const deleteMutation = useDeleteScheduleMutation()

    // Real-time updates
    useSchedulesSSE()

    const handleCreate = (scheduleData: any) => {
        createMutation.mutate(scheduleData, {
            onSuccess: () => setIsCreateModalOpen(false)
        })
    }

    const handleUpdate = (scheduleData: any) => {
        if (editingSchedule) {
            updateMutation.mutate({ id: editingSchedule.id, ...scheduleData }, {
                onSuccess: () => setEditingSchedule(null)
            })
        }
    }

    const handleDelete = (id: string) => {
        if (confirm('Are you sure you want to delete this schedule?')) {
            deleteMutation.mutate(id)
        }
    }

    if (isLoading) {
        return <LoadingState />
    }

    return (
        <GlassContainer className="px-4 py-6 sm:px-6">
            {/* Header */}
            <div className="mb-6">
                <GlassCard className="p-4 sm:p-6">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div className="flex items-center gap-3">
                            <div className="p-2 sm:p-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500">
                                <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                            </div>
                            <div>
                                <h1 className="text-xl sm:text-3xl font-bold text-white">Class Schedules</h1>
                                <p className="text-sm sm:text-base text-slate-300">Manage your class timetables</p>
                            </div>
                        </div>

                        <GlassButton
                            onClick={() => setIsCreateModalOpen(true)}
                            className="px-4 py-2 sm:px-6 sm:py-3"
                        >
                            <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
                            <span className="hidden sm:inline">Add Schedule</span>
                            <span className="sm:hidden">Add</span>
                        </GlassButton>
                    </div>
                </GlassCard>
            </div>

            {/* Content */}
            {schedules && schedules.length > 0 ? (
                <>
                    {/* Mobile View - Always cards on mobile */}
                    <div className="block lg:hidden">
                        <MobileCardView
                            schedules={schedules}
                            onEdit={setEditingSchedule}
                            onDelete={handleDelete}
                        />
                    </div>

                    {/* Desktop View - Always table on desktop */}
                    <div className="hidden lg:block">
                        <DesktopTableView
                            schedules={schedules}
                            onEdit={setEditingSchedule}
                            onDelete={handleDelete}
                        />
                    </div>
                </>
            ) : (
                <EmptyState onCreateClick={() => setIsCreateModalOpen(true)} />
            )}

            {/* Create Modal */}
            <GlassModal
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
                title="Create Schedule"
                className="mx-4 sm:mx-0"
            >
                <ScheduleForm
                    onSubmit={handleCreate}
                    onCancel={() => setIsCreateModalOpen(false)}
                    isLoading={createMutation.isPending}
                />
            </GlassModal>

            {/* Edit Modal */}
            <GlassModal
                isOpen={!!editingSchedule}
                onClose={() => setEditingSchedule(null)}
                title="Edit Schedule"
                className="mx-4 sm:mx-0"
            >
                {editingSchedule && (
                    <ScheduleForm
                        schedule={editingSchedule}
                        onSubmit={handleUpdate}
                        onCancel={() => setEditingSchedule(null)}
                        isLoading={updateMutation.isPending}
                    />
                )}
            </GlassModal>
        </GlassContainer>
    )
}

// Mobile Card View Component
interface MobileCardViewProps {
    schedules: Schedule[]
    onEdit: (schedule: Schedule) => void
    onDelete: (id: string) => void
}

function MobileCardView({ schedules, onEdit, onDelete }: MobileCardViewProps) {
    return (
        <div className="space-y-4">
            {schedules.map((schedule) => (
                <GlassCard key={schedule.id} className="p-4">
                    <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500">
                                <Users className="w-4 h-4 text-white" />
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-gray-300">{schedule.classesName}</h3>
                                {schedule.ages && (
                                    <p className="text-sm text-slate-300">Ages: {schedule.ages}</p>
                                )}
                            </div>
                        </div>

                        <div className="flex items-center gap-1">
                            <GlassButton
                                variant="primary"
                                size="sm"
                                onClick={() => onEdit(schedule)}
                                className="p-2"
                            >
                                <Edit className="w-3 h-3" />
                            </GlassButton>
                            <GlassButton
                                variant="danger"
                                size="sm"
                                onClick={() => onDelete(schedule.id)}
                                className="p-2"
                            >
                                <Trash2 className="w-3 h-3" />
                            </GlassButton>
                        </div>
                    </div>

                    {/* Weekly Schedule Grid */}
                    <div className="grid grid-cols-2 gap-2 text-sm">
                        {[
                            { day: 'Monday', time: schedule.monday },
                            { day: 'Tuesday', time: schedule.tuesday },
                            { day: 'Wednesday', time: schedule.wednesday },
                            { day: 'Thursday', time: schedule.thursday },
                            { day: 'Friday', time: schedule.friday },
                            { day: 'Saturday', time: schedule.saturday },
                            { day: 'Sunday', time: schedule.sunday },
                        ].map(({ day, time }) => (
                            <div key={day} className="flex justify-between py-1">
                                <span className="text-slate-400">{day.slice(0, 3)}:</span>
                                <span className="text-slate-300">{time || '-'}</span>
                            </div>
                        ))}
                    </div>
                </GlassCard>
            ))}
        </div>
    )
}

// Desktop Table View Component (แบบเก่า)
interface DesktopTableViewProps {
    schedules: Schedule[]
    onEdit: (schedule: Schedule) => void
    onDelete: (id: string) => void
}

function DesktopTableView({ schedules, onEdit, onDelete }: DesktopTableViewProps) {
    return (
        <GlassCard className="overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-white/10">
                            <th className="text-left p-6 text-slate-300 font-medium">Class</th>
                            <th className="text-left p-6 text-slate-300 font-medium">Ages</th>
                            <th className="text-left p-6 text-slate-300 font-medium">Monday</th>
                            <th className="text-left p-6 text-slate-300 font-medium">Tuesday</th>
                            <th className="text-left p-6 text-slate-300 font-medium">Wednesday</th>
                            <th className="text-left p-6 text-slate-300 font-medium">Thursday</th>
                            <th className="text-left p-6 text-slate-300 font-medium">Friday</th>
                            <th className="text-left p-6 text-slate-300 font-medium">Saturday</th>
                            <th className="text-left p-6 text-slate-300 font-medium">Sunday</th>
                            <th className="text-left p-6 text-slate-300 font-medium">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {schedules.map((schedule) => (
                            <tr key={schedule.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                <td className="p-6">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500">
                                            <Users className="w-4 h-4 text-white" />
                                        </div>
                                        <span className="text-gray-300 font-medium">{schedule.classesName}</span>
                                    </div>
                                </td>
                                <td className="p-6 text-slate-300">{schedule.ages || '-'}</td>
                                <td className="p-6 text-slate-300">{schedule.monday || '-'}</td>
                                <td className="p-6 text-slate-300">{schedule.tuesday || '-'}</td>
                                <td className="p-6 text-slate-300">{schedule.wednesday || '-'}</td>
                                <td className="p-6 text-slate-300">{schedule.thursday || '-'}</td>
                                <td className="p-6 text-slate-300">{schedule.friday || '-'}</td>
                                <td className="p-6 text-slate-300">{schedule.saturday || '-'}</td>
                                <td className="p-6 text-slate-300">{schedule.sunday || '-'}</td>
                                <td className="p-6">
                                    <div className="flex items-center gap-2">
                                        <GlassButton
                                            variant="primary"
                                            size="sm"
                                            onClick={() => onEdit(schedule)}
                                            className="p-2"
                                        >
                                            <Edit className="w-4 h-4" />
                                        </GlassButton>
                                        <GlassButton
                                            variant="danger"
                                            size="sm"
                                            onClick={() => onDelete(schedule.id)}
                                            className="p-2"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </GlassButton>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </GlassCard>
    )
}

// Empty State Component
interface EmptyStateProps {
    onCreateClick: () => void
}

function EmptyState({ onCreateClick }: EmptyStateProps) {
    return (
        <GlassCard className="p-8 sm:p-12 text-center">
            <div className="flex flex-col items-center gap-4">
                <div className="p-4 rounded-full bg-slate-700/50">
                    <Calendar className="w-8 h-8 text-slate-400" />
                </div>
                <div>
                    <h3 className="text-lg font-medium text-white mb-2">No schedules found</h3>
                    <p className="text-slate-400 mb-4 text-sm sm:text-base">Get started by creating your first class schedule</p>
                    <GlassButton
                        onClick={onCreateClick}
                        className="px-4 py-2"
                    >
                        <Plus className="w-4 h-4" />
                        Create Schedule
                    </GlassButton>
                </div>
            </div>
        </GlassCard>
    )
}

// Loading State Component
function LoadingState() {
    return (
        <GlassContainer className="flex items-center justify-center px-4">
            <GlassCard className="p-6 sm:p-8">
                <div className="flex items-center gap-4">
                    <div className="animate-spin rounded-full h-6 w-6 sm:h-8 sm:w-8 border-b-2 border-purple-500"></div>
                    <span className="text-white text-base sm:text-lg">Loading schedules...</span>
                </div>
            </GlassCard>
        </GlassContainer>
    )
}

// Mobile-Optimized Schedule Form Component
interface ScheduleFormProps {
    schedule?: Schedule
    onSubmit: (data: any) => void
    onCancel: () => void
    isLoading: boolean
}

function ScheduleForm({ schedule, onSubmit, onCancel, isLoading }: ScheduleFormProps) {
    const [formData, setFormData] = useState({
        classesName: schedule?.classesName || 'Bugs' as ScheduleClassName,
        ages: schedule?.ages || '',
        monday: schedule?.monday || '',
        tuesday: schedule?.tuesday || '',
        wednesday: schedule?.wednesday || '',
        thursday: schedule?.thursday || '',
        friday: schedule?.friday || '',
        saturday: schedule?.saturday || '',
        sunday: schedule?.sunday || '',
        days: schedule?.days || 'Monday' as ScheduleDay,
    })

    const classOptions: ScheduleClassName[] = [
        'Bugs', 'Birds', 'Beasts', 'SuperBeasts',
        'FunnyBugs', 'GiggleWorms', 'GoodFriends', 'FlipsHotshots'
    ]

    const dayOptions: ScheduleDay[] = [
        'Monday', 'Tuesday', 'Wednesday', 'Thursday',
        'Friday', 'Saturday', 'Sunday'
    ]

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        onSubmit(formData)
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            <div className="grid grid-cols-1 gap-4 sm:gap-6">
                {/* Class Name */}
                <div>
                    <label className="block text-slate-300 font-medium mb-2 text-sm sm:text-base">Class Name</label>
                    <select
                        value={formData.classesName}
                        onChange={(e) => setFormData({ ...formData, classesName: e.target.value as ScheduleClassName })}
                        className="w-full p-3 rounded-xl bg-white/5 border border-white/10 text-white backdrop-blur-xl focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-300 text-sm sm:text-base"
                    >
                        {classOptions.map(option => (
                            <option key={option} value={option} className="bg-slate-800">{option}</option>
                        ))}
                    </select>
                </div>

                {/* Ages */}
                <GlassInput
                    label="Ages"
                    type="text"
                    value={formData.ages}
                    onChange={(e) => setFormData({ ...formData, ages: e.target.value })}
                    placeholder="e.g., 3-5 years"
                    className="text-sm sm:text-base"
                />
            </div>

            {/* Weekly Schedule */}
            <div>
                <h3 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4">Weekly Schedule</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    {['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'].map(day => (
                        <GlassInput
                            key={day}
                            label={day.charAt(0).toUpperCase() + day.slice(1)}
                            type="text"
                            value={formData[day as keyof typeof formData] as string}
                            onChange={(e) => setFormData({ ...formData, [day]: e.target.value })}
                            placeholder="e.g., 9:00-10:00 AM"
                            className="text-sm sm:text-base"
                        />
                    ))}
                </div>
            </div>

            {/* Primary Day */}
            <div>
                <label className="block text-slate-300 font-medium mb-2 text-sm sm:text-base">Primary Day</label>
                <select
                    value={formData.days}
                    onChange={(e) => setFormData({ ...formData, days: e.target.value as ScheduleDay })}
                    className="w-full p-3 rounded-xl bg-white/5 border border-white/10 text-white backdrop-blur-xl focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-300 text-sm sm:text-base"
                >
                    {dayOptions.map(option => (
                        <option key={option} value={option} className="bg-slate-800">{option}</option>
                    ))}
                </select>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 pt-4">
                <GlassButton
                    type="submit"
                    disabled={isLoading}
                    className="px-6 py-3 justify-center"
                >
                    {isLoading ? (
                        <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                            Saving...
                        </>
                    ) : (
                        <>
                            <Clock className="w-4 h-4" />
                            {schedule ? 'Update' : 'Create'} Schedule
                        </>
                    )}
                </GlassButton>
                <GlassButton
                    type="button"
                    variant="secondary"
                    onClick={onCancel}
                    className="px-6 py-3 justify-center"
                >
                    Cancel
                </GlassButton>
            </div>
        </form>
    )
}
