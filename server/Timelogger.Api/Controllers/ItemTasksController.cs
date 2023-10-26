using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Timelogger.Entities;
using Timelogger.Enums;

namespace Timelogger.Api.Controllers
{
    [Route("api/tasks")]
    [ApiController]
    public class ItemTasksController : ControllerBase
    {
        private readonly ApiContext _context;

        public ItemTasksController(ApiContext context)
        {
            _context = context;
        }

        // GET: api/tasks
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ItemTask>>> GetTasks()
        {
            return await _context.Tasks.ToListAsync();
        }

        // GET: api/tasks/5
        [HttpGet("fetchTasksByProjectId/{projectId}")]
        public async Task<ActionResult<IEnumerable<ItemTask>>> FetchTasksByProjectId(int projectId)
        {
            var tasks = await _context.Tasks.Where(x => x.ProjectId == projectId).ToListAsync();

            if (tasks == null)
            {
                return NotFound();
            }

            return tasks;
        }

        // GET: api/tasks/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ItemTask>> GetTask(int id)
        {
            var task = await _context.Tasks.FindAsync(id);

            if (task == null)
            {
                return NotFound();
            }

            return task;
        }

        // POST: api/tasks
        [HttpPost]
        public async Task<ActionResult<ItemTask>> CreateTask(ItemTask task)
        {
            // Check the state of the project before adding a new task
            var project = _context.Projects.FirstOrDefault(x => x.Id == task.ProjectId);
            if (project != null)
            {
                if (project.ProjectStatusId != (int)ProjectStatusTypeEnum.Completed)
                {
                    if (task.PreDefinedDuration >= 30)
                    {
                        _context.Tasks.Add(task);
                        await _context.SaveChangesAsync();
                        return CreatedAtAction(nameof(GetTask), new { id = task.Id }, task);
                    }
                    else
                        return BadRequest("Cannot create a new task with a duration less than 30 minutes.");
                }
                else
                    return BadRequest("Cannot create a new task for a completed project.");
            }
            else
                return NotFound("Project not found.");

        }

        // PUT: api/tasks/5
        [HttpPut("{id}")]
        public async Task<ActionResult<ItemTask>> UpdateTask(int id, ItemTask task)
        {
            if (id != task.Id)
            {
                return BadRequest();
            }

            _context.Entry(task).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TaskExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return task;
        }

        // DELETE: api/tasks/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<ItemTask>> DeleteTask(int id)
        {
            var task = await _context.Tasks.FindAsync(id);
            if (task == null)
            {
                return NotFound();
            }

            _context.Tasks.Remove(task);
            await _context.SaveChangesAsync();

            return task;
        }

        private bool TaskExists(int id)
        {
            return _context.Tasks.Any(e => e.Id == id);
        }
    }
}

