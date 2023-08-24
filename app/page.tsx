import { ProjectInterface } from '@/common.types';
import Categories from '@/components/Categories';
import ProjectCard from '@/components/ProjectCard';
import { fetchAllProjects, fetchAllProjectsByCategory } from '@/lib/actions';

type SearchParams = {
    category?: string;
    endcursor?: string | null;
  }
  
  type Props = {
    searchParams: SearchParams
  }

type ProjectSearch = {
    projectSearch: {
        edges: {node: ProjectInterface}[]
        pageInfo: {
            hasPreviousPage: boolean,
            hasNextPage: boolean,
            startCursor: string,
            endCursor: string,
        }
    }
}

const Home = async ({ searchParams: { category, endcursor } }: Props) => {
    
    let data = await fetchAllProjects() as ProjectSearch
    if(category && category !== "All")
    {
        data = await fetchAllProjectsByCategory(category) as ProjectSearch

    }
        

    const projectsToDisplay = data?.projectSearch?.edges || [];

    if(projectsToDisplay.length === 0)
    {
        
        return (
            <section className='flexStart flex-col paddings'>
                <Categories />
                <p className='no-result-text text-center'>
                    No projects found.
                </p>

            </section>
        )
    }
    return (
       <section className="flex-start flex-col paddings mb-16">
        <Categories />
        <section className='projects-grid'>
            {projectsToDisplay.map(({node}: {node : ProjectInterface}) => (
                <ProjectCard 
                    key={node?.id}
                    id={node?.id}
                    image={node?.image}
                    title={node?.title}
                    name={node?.createdBy?.name}
                    avatarUrl={node?.createdBy?.avatarUrl}
                    userId={node?.createdBy?.id}
                />
            ))}
        
        </section>
        
       </section>
    )
}

export default Home;