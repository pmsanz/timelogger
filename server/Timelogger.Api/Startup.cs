using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using System.Collections.Generic;
using Timelogger.Entities;

namespace Timelogger.Api
{
    public class Startup
    {
        private readonly IWebHostEnvironment _environment;
        public IConfigurationRoot Configuration { get; }

        public Startup(IWebHostEnvironment env)
        {
            _environment = env;

            var builder = new ConfigurationBuilder()
                .SetBasePath(env.ContentRootPath)
                .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
                .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true)
                .AddEnvironmentVariables();
            Configuration = builder.Build();
        }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            // Add framework services.
            services.AddDbContext<ApiContext>(opt => opt.UseInMemoryDatabase("e-conomic interview"));
            services.AddLogging(builder =>
            {
                builder.AddConsole();
                builder.AddDebug();
            });

            services.AddMvc(options => options.EnableEndpointRouting = false);

            if (_environment.IsDevelopment())
            {
                services.AddCors();
            }
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseCors(builder => builder
                    .AllowAnyMethod()
                    .AllowAnyHeader()
                    .SetIsOriginAllowed(origin => true)
                    .AllowCredentials());
            }

            app.UseMvc();


            var serviceScopeFactory = app.ApplicationServices.GetService<IServiceScopeFactory>();
            using (var scope = serviceScopeFactory.CreateScope())
            {
                SeedDatabase(scope);
            }
        }

        private static void SeedDatabase(IServiceScope scope)
        {
            var context = scope.ServiceProvider.GetService<ApiContext>();
            var testProject1 = new Project
            {
                Id = 1,
                Name = "CloudSync Pro",
                Description = "This is the description.",
                ProjectStatusId = 2,
                StartDate = new System.DateTime(2023, 10, 1),
                EndDate = new System.DateTime(2023, 12, 31),
            };

            var testProject2 = new Project
            {
                Id = 2,
                Name = "Metagram",
                Description = "The new and best social network.",
                ProjectStatusId = 0,
                StartDate = new System.DateTime(2023, 10, 1),
                EndDate = new System.DateTime(2024, 5, 31),
            };

            List<ItemTask> taskCollection = new List<ItemTask> {
                new ItemTask
                {
                    Id = 1,
                    Name = "Determine Project Scope and Requirements",
                    StartDate = new System.DateTime(2023, 1, 2, 9, 0, 0),
                    PreDefinedDuration = 120,
                    Description = "Determine Project Scope and Requirements.\r\n",
                    TaskStatusId = (int)Enums.TaskStatusTypeEnum.Completed,
                    Log = "01/02/2023 09:00:00 a.m - ItemTask created\r\n",
                    ProjectId = 1,
                },
                new ItemTask
                {
                    Id = 2,
                    Name = "Design Database Schema for Sync Metadata",
                    StartDate = new System.DateTime(2023, 1, 3, 10, 0, 0),
                    PreDefinedDuration = 90,
                    Description = "Design Database Schema for Sync Metadata.\r\n",
                    TaskStatusId = (int)Enums.TaskStatusTypeEnum.Completed,
                    Log = "01/03/2023 10:00:00 a.m - ItemTask created\r\n",
                    ProjectId = 1,
                },

                new ItemTask
                {
                    Id = 3,
                    Name = "Develop Backend API for Sync Operations",
                    StartDate = new System.DateTime(2023, 1, 4, 9, 30, 0),
                    PreDefinedDuration = 240,
                    Description = "Develop Backend API for Sync Operations.\r\n",
                    TaskStatusId = (int)Enums.TaskStatusTypeEnum.InProcess,
                    Log = "01/04/2023 09:30:00 a.m - ItemTask created\r\n",
                    ProjectId = 1,
                },
                 new ItemTask
                {
                    Id = 4,
                    Name = "Implement User Authentication and Authorization",
                    StartDate = new System.DateTime(2023, 1, 5, 10, 15, 0),
                    PreDefinedDuration = 180,
                    Description = "Implement User Authentication and Authorization.\r\n",
                    TaskStatusId = (int)Enums.TaskStatusTypeEnum.InProcess,
                    Log = "01/05/2023 10:15:00 a.m - ItemTask created\r\n",
                    ProjectId = 1,
                },
                new ItemTask
                {
                    Id = 5,
                    Name = "Develop File Change Detection Mechanism",
                    StartDate = new System.DateTime(2023, 1, 8, 11, 0, 0),
                    PreDefinedDuration = 150,
                    Description = "Develop File Change Detection Mechanism.\r\n",
                    TaskStatusId = (int)Enums.TaskStatusTypeEnum.Created,
                    Log = "01/08/2023 11:00:00 a.m - ItemTask created\r\n",
                    ProjectId = 1,
                },
                new ItemTask
                {
                    Id = 6,
                    Name = "Design User Interface for Sync Progress",
                    StartDate = new System.DateTime(2023, 1, 9, 14, 0, 0),
                    PreDefinedDuration = 90,
                    Description = "Design User Interface for Sync Progress.\r\n",
                    TaskStatusId = (int)Enums.TaskStatusTypeEnum.Created,
                    Log = "01/09/2023 02:00:00 p.m - ItemTask created\r\n",
                    ProjectId = 1,
                },
                new ItemTask
                {
                    Id = 7,
                    Name = "Integrate Cloud Storage Providers",
                    StartDate = new System.DateTime(2023, 1, 10, 10, 0, 0),
                    PreDefinedDuration = 300,
                    Description = "Integrate Cloud Storage Providers.\r\n",
                    TaskStatusId = (int)Enums.TaskStatusTypeEnum.Created,
                    Log = "01/10/2023 10:00:00 a.m - ItemTask created\r\n",
                    ProjectId = 1,
                },
                new ItemTask
                {
                    Id = 8,
                    Name = "Conduct Initial Alpha Testing",
                    StartDate = new System.DateTime(2023,  1,15, 9, 0, 0),
                    PreDefinedDuration = 240,
                    Description = "Conduct Initial Alpha Testing.\r\n",
                    TaskStatusId = (int)Enums.TaskStatusTypeEnum.Created,
                    Log = "01/15/2023 09:00:00 a.m - ItemTask created\r\n",
                    ProjectId = 1,
                },

                new ItemTask
                {
                    Id = 9,
                    Name = "Refactor and Optimize Code for Efficiency",
                    StartDate = new System.DateTime(2023,  1,18, 10, 30, 0),
                    PreDefinedDuration = 210,
                    Description = "Refactor and Optimize Code for Efficiency.\r\n",
                    TaskStatusId = (int)Enums.TaskStatusTypeEnum.Created,
                    Log = "01/18/2023 10:30:00 a.m - ItemTask created\r\n",
                    ProjectId = 1,
                },

                new ItemTask
                {
                    Id = 10,
                    Name = "Document User Manual and Developer API",
                    StartDate = new System.DateTime(2023,  1,20, 13, 30, 0),
                    PreDefinedDuration = 180,
                    Description = "Document User Manual and Developer API.\r\n",
                    TaskStatusId = (int)Enums.TaskStatusTypeEnum.Created,
                    Log = "01/20/2023 01:30:00 p.m - ItemTask created\r\n",
                    ProjectId = 1,
                }

        };

            context.Projects.Add(testProject1);
            context.Projects.Add(testProject2);
            context.SaveChanges();
            context.Tasks.AddRange(taskCollection);
            context.SaveChanges();

        }
    }
}