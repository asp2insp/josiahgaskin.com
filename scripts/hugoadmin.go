package main

import(
    "github.com/spf13/cobra"
    "fmt"
    "os"
    "ioutil"
)

const indexTemplate = "<html><head><title>%v</title><body><h1> Hello World </h1></body></html"

var dryRun bool
var verbose bool

type Change struct {
	Cmd, Target, Data string
}

func (c Change) String() string {
	if len(c.Data) == 0 {
		return fmt.Sprintf("%v %v", c.Cmd, c.Target)
	} else {
		return fmt.Sprintf("%v %v with payload [%v]", c.Cmd, c.Target, c.Data)
	}
}

var Actions = map[string]func(string, string) {
	"create directory": func(target string, data string) {
			os.MkdirAll(target, os.ModeDir | 0775)
		},
	"create file with contents": func(target string, data string) {
			ioutil.WriteFile(target, data, 0664)
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
	fmt.Println("Creating Project '" + args[0] + "'...")
	var changeArray = [...]Change {
		Change{Cmd: "create directory", Target: args[0], Data: ""},
		Change{Cmd: "create directory", Target: fmt.Sprintf("%v/content", args[0]), Data: ""},
		Change{Cmd: "create directory", Target: fmt.Sprintf("%v/layouts", args[0]), Data: ""},
		Change{Cmd: "create directory", Target: fmt.Sprintf("%v/static", args[0]), Data: ""},
		Change{ Cmd: "create file with contents",
			    Target: fmt.Sprintf("%v/layouts/index.html", args[0]),
			    Data: fmt.Sprintf(indexTemplate, args[0]),
			  },
	}
	execute(changeArray[0:])
}

func createType(cmd *cobra.Command, args []string) {
	fmt.Println("Creating Type '" + args[0] + "'...")
}

func execute(changes []Change) {
	for i := range changes {
		var c = changes[i]
		if verbose || dryRun {
			fmt.Println(c)
		}

		if !dryRun {
			Actions[c.Cmd](c.Target, c.Data)
		}
	}
}

