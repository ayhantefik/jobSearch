interface Employer {
  name: string;
}

interface WorkplaceAddress {
  municipality: string;
}

interface Job {
  headline: string;
  publication_date: string;
  employer: Employer;
  workplace_address: WorkplaceAddress;
}

interface JobSearchResponse {
  hits: Job[];
}

const searchJobs = async (keyword: string) => {
  try {
    const result = `https://jobsearch.api.jobtechdev.se/search?q=${keyword}&offset=0&limit=10`;
    const response = await fetch(result);

    if (!response.ok) {
      console.error(
        `API request failed. Status: ${response.status}`
      );
      return;
    }

    let data: JobSearchResponse;

    try {
      data = (await response.json()) as JobSearchResponse;
    } catch {
      console.error("Failed to parse API response");
      return;
    }

    if (!data.hits || !Array.isArray(data.hits)) {
      console.error("Invalid API response");
      return;
    }

    console.log(`\nFound ${data.hits.length} jobs`);
    console.log("-".repeat(50));
    //console.log(data);

    // console.dir usage
    // if (data.hits.length > 0) {
    //   console.dir(data.hits[0], { depth: 2 });
    // }


    data.hits.forEach((job: any, index: number) => {
      const pubDate = new Date(job.publication_date);
      //console.log("pubDate: ", pubDate);

      console.log(`${index + 1}. ${job.headline}`);
      console.log(`Company: ${job.employer.name}`);
      console.log(`Location: ${job.workplace_address.municipality}`);
      console.log(`Publication: ${pubDate.toISOString().split("T")[0]}`);
      console.log("-".repeat(50));
    });
  } catch (error) {
    console.error(error);
  }
};

const runApp = () => {
  try {
    console.log("Welcome to the Job Search App!");
    console.log("This app searches for jobs using JobTeach API");
    const keyword = "Software Developer Malmö";
    searchJobs(keyword);
  } catch (error) {
    console.error(error);
  }
};

runApp();