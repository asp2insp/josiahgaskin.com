package main

import(
    "github.com/spf13/cobra"
    "fmt"
    "os"
    "time"
    "text/template"
)

const siteIndex = "data/siteIndex.html"
const typeIndex = "data/typeIndex.html"
const defaultHtml = "data/defaultSingle.html"
const typeMd = "data/typeInstance.md"
const typeHtml = "data/defaultSingle.html"

var dryRun bool
var verbose bool

type Data struct {
	Title string
	Date time.Time
}

type Change struct {
	Cmd, Target, TemplateLocation string
	Payload *Data
}

func (c Change) String() string {
	if len(c.TemplateLocation) == 0 {
		return fmt.Sprintf("%v %v", c.Cmd, c.Target)
	} else {
		return fmt.Sprintf("%v %v with payload [%v]", c.Cmd, c.Target, c.Payload)
	}
}

var Actions = map[string]func(string, string, *Data) {
	"create directory": func(target string, templateLocation string, data *Data) {
			os.MkdirAll(target, os.ModeDir | 0775)
		},
	"create file with contents": func(target string, templateLocation string, data *Data) {
			f, err := os.Create(target)
			if err != nil { panic(err) }

			var templateContents, _ = Asset(templateLocation)
			var templateString = string(templateContents)

			if (data != nil) {
				tmpl, err := template.New("template").Parse(templateString)
				if err != nil { panic(err) }
				err = tmpl.Execute(f, data)
				if err != nil { panic(err) }
			} else {
				// Just write the file
    			_, err := f.Write(templateContents)
    			if err!= nil { panic(err) }
			}
			f.Close()
		},
}

func main() {

	var cmdCreateProject = &cobra.Command {
		Use: "createproject [Project Name]",
		Short: "Create a new Hugo project",
		Long: "Used to create the skeleton of a new site.",
		Run: createProject,
	}

	var cmdCreateType = &cobra.Command {
		Use: "createtype [Type Name]",
		Short: "Create a new type",
		Long: "Used to create a new Hugo type in the project represented by the current directory.",
		Run: createType,
	}

    var rootCmd = &cobra.Command{Use: "hugoadmin"}

    rootCmd.PersistentFlags().BoolVarP(&dryRun, "dryrun", "D", false, "Dry run only; list files without creating them on disk.")
	rootCmd.PersistentFlags().BoolVarP(&verbose, "verbose", "v", false, "Verbose mode; spew more output.")

    rootCmd.AddCommand(cmdCreateProject, cmdCreateType)
    rootCmd.Execute()
}

func createProject(cmd *cobra.Command, args []string) {
	if len(args) == 0 {
		fmt.Println("Please specify a project name!")
		return
	}
	var projectName = args[0]
	fmt.Println("Creating Project '" + projectName + "'...")
	var changeArray = [...]Change {
		Change{Cmd: "create directory", Target: projectName},
		Change{Cmd: "create directory", Target: fmt.Sprintf("%v/content", projectName)},
		Change{Cmd: "create directory", Target: fmt.Sprintf("%v/layouts", projectName)},
		Change{Cmd: "create directory", Target: fmt.Sprintf("%v/layouts/indexes", projectName)},
		Change{Cmd: "create directory", Target: fmt.Sprintf("%v/static", projectName)},
		Change{Cmd: "create directory", Target: fmt.Sprintf("%v/static/static", projectName)},
		Change{Cmd: "create directory", Target: fmt.Sprintf("%v/static/static/js", projectName)},
		Change{Cmd: "create directory", Target: fmt.Sprintf("%v/static/static/img", projectName)},
		Change{Cmd: "create directory", Target: fmt.Sprintf("%v/static/static/css", projectName)},
		Change{Cmd: "create directory", Target: fmt.Sprintf("%v/static/static/fonts", projectName)},
		Change{ Cmd: "create file with contents",
			    Target: fmt.Sprintf("%v/layouts/_default/single.html", projectName),
			    TemplateLocation: defaultHtml,
			  },
		Change{ Cmd: "create file with contents",
			    Target: fmt.Sprintf("%v/layouts/index.html", projectName),
			    TemplateLocation: siteIndex,
			    Payload: &Data{Title: projectName},
			  },
	}
	execute(changeArray[0:])
}

func createType(cmd *cobra.Command, args []string) {
	if len(args) == 0 {
		fmt.Println("Please specify a type name!")
		return
	}
	var typeName = args[0]
	fmt.Println("Creating Type '" + typeName + "'...")
	var changeArray = [...]Change {
		Change{Cmd: "create directory", Target: fmt.Sprintf("content/%v", typeName)},
		Change{Cmd: "create directory", Target: fmt.Sprintf("layouts/%v", typeName)},
		Change{ Cmd: "create file with contents",
			    Target: fmt.Sprintf("content/%v/firstinstance.md", typeName),
			    TemplateLocation: typeMd,
			    Payload: &Data{Title: typeName, Date: time.Now()},
			  },
		Change{ Cmd: "create file with contents",
			    Target: fmt.Sprintf("layouts/%v/single.html", typeName),
			    TemplateLocation: defaultHtml,
			  },
		Change{ Cmd: "create file with contents",
			    Target: fmt.Sprintf("layouts/indexes/%v.html", typeName),
			    TemplateLocation: typeIndex,
			  },
	}
	execute(changeArray[:])
}

func execute(changes []Change) {
	for i := range changes {
		var c = changes[i]
		if verbose || dryRun {
			fmt.Println(c)
		}

		if !dryRun {
			Actions[c.Cmd](c.Target, c.TemplateLocation, c.Payload)
		}
	}
}
