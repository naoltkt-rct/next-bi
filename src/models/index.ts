export type Task = {
  id: string
  name: string
  priority: string
  status: string
  startDate: string
  endDate: string
}

export type Tasks = Task & {
  description: string
  assignment: TasksAssignment[]
}

export type TasksAssignment = {
  id: string
  assignmentName: string
  jobType: string
  startDate: string
  endDate: string
  assignmentId: string
  status: string
}

export type TasksAssignmentOccupancyRate = Task & {
  occupancyRate: number
}

export type TasksAssignmentUser = {
  id: string
  totalOccupancyRate: number
  tasks: TasksAssignmentOccupancyRate[]
}
export type User = {
  id: string
  username: string
  avatar: string
}

export type Users = User & {
  job: string
  totalOccupancyRate?: number
}

export type UsersDetail = Users & {
  description: string
  taskIds: string[]
}

export type Sort = 'priority' | 'status' | 'startDate' | 'endDate'

export type Order = 'ASC' | 'DESC'

export type Tabs = 'TASKS' | 'USERS'

export type Jobs = 'director' | 'designer' | 'frontend' | 'backend'
