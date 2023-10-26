using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using Timelogger.Enums;

namespace Timelogger.Api.Controllers
{
    [Route("api/projectStatus")]
    [ApiController]
    public class ProjectStatusController : ControllerBase
    {
        public ProjectStatusController(ApiContext context)
        {
        }

        [HttpGet()]
        public ActionResult<IEnumerable<StatusObject>> GetStatus()
        {
            var enumValues = Enum.GetValues(typeof(ProjectStatusTypeEnum))
                                 .Cast<ProjectStatusTypeEnum>()
                                 .Select(x => new StatusObject { Id = (int)x, Name = x.ToString() })
                                 .ToList();

            return enumValues;
        }

        [HttpGet("{statusId}")]
        public ActionResult<StatusObject> GetStatusByKey(string statusId)
        {
            if (Enum.TryParse(statusId, true, out ProjectStatusTypeEnum status))
            {
                var statusObject = new StatusObject { Id = (int)status, Name = status.ToString() };
                return statusObject;
            }
            else
            {
                return NotFound("Value not found");
            }
        }
    }

    [Route("api/taskStatus")]
    [ApiController]
    public class TaskStatusController : ControllerBase
    {
        public TaskStatusController(ApiContext context)
        {
        }

        [HttpGet()]
        public ActionResult<IEnumerable<StatusObject>> GetStatus()
        {
            var enumValues = Enum.GetValues(typeof(TaskStatusTypeEnum))
                                 .Cast<TaskStatusTypeEnum>()
                                 .Select(x => new StatusObject { Id = (int)x, Name = x.ToString() })
                                 .ToList();

            return enumValues;
        }

        [HttpGet("{statusId}")]
        public ActionResult<StatusObject> GetStatusByKey(string statusId)
        {
            if (Enum.TryParse(statusId, true, out TaskStatusTypeEnum status))
            {
                var statusObject = new StatusObject { Id = (int)status, Name = status.ToString() };
                return statusObject;
            }
            else
            {
                return NotFound("Value not found");
            }
        }
    }

    public class StatusObject
    {
        public int Id { get; set; }
        public string Name { get; set; }
    }
}

