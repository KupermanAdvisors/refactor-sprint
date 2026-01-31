-- Add sprint_name column to sprints table
ALTER TABLE public.sprints 
ADD COLUMN IF NOT EXISTS sprint_name text;

-- Update presentation_slug to be unique per sprint_name + client_name + date
-- This allows multiple sprints for the same client with different names

-- Add index for faster lookups
CREATE INDEX IF NOT EXISTS idx_sprints_client_name ON public.sprints(client_name);
CREATE INDEX IF NOT EXISTS idx_sprints_sprint_name ON public.sprints(sprint_name);

-- Update the comment
COMMENT ON COLUMN public.sprints.sprint_name IS 'Name/version of the sprint (e.g., "Initial Audit", "Revised Strategy")';
